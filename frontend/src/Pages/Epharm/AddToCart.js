import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../css/Epharm/Cart.css";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdb-react-ui-kit';


const CART_STORAGE_KEY = process.env.REACT_APP_CART_STORAGE_KEY;

const AddToCart = () => {
  const [enteredCode, setEnteredCode] = useState("");
  const [cart, setCart] = useState([]);
  const [enteredCodes, setEnteredCodes] = useState([]); 
  const [userData, setUserData] = useState("");


  useEffect(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);

    if (storedCart) {
      const cartData = JSON.parse(storedCart);
      setCart(cartData);
    }
  }, []);

  const updateLocalStorage = (cartData) => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartData));
  };

  const calculateTotalPrice = () => {
    if (cart.length === 0) {
      return 0;
    }

    const totalPrice = cart.reduce((total, product) => {
      const itemPrice = parseFloat(product.price);
      const itemQuantity = parseInt(product.quantity);

      if (isNaN(itemPrice) || isNaN(itemQuantity)) {
        return total;
      }

      return total + itemPrice * itemQuantity;
    }, 0);

    return totalPrice.toFixed(2);
  };

  // ... (previous code)

  const handleCodeSearch = async () => {
    try {
      // Fetch user data to get the user's ID (idnum)
      const userDataResponse = await axios.get("http://localhost:8081/login/rolecheck", {
        withCredentials: true,
      });
      const userId = userDataResponse.data.idnum;
  
      // Make an API request to get the reportid associated with the entered code
      const codeResponse = await axios.get(`http://localhost:8081/epharm/SearchByCode?code=${enteredCode}`);
      const codeData = codeResponse.data;
  
      if (codeData.length === 0) {
        alert("No products found for the entered code.");
        return;
      }
  
      const reportId = codeData[0].reportid;
  
      // Fetch the medical report for the reportId
      console.log("Fetching medical report for reportId:", reportId);
      const medicalReportResponse = await axios.get(`http://localhost:8081/appointments/getMedicalReportByReportId/${reportId}`);
      const medicalReportData = medicalReportResponse.data;
  
      if (medicalReportData.status === 'Success') {
        const patientId = medicalReportData.patientid;
  
        if (patientId !== userId) {
          alert("This code does not belong to you.");
          return;
        }
      } else {
        alert("No medical report found for the entered code.");
        return;
      }
  
      // Check if any of the new products are already in the cart
      const existingProductIds = cart.map((product) => product.id);
      const newProductsToAdd = codeData.filter(
        (product) => !existingProductIds.includes(product.productid)
      );
  
      if (newProductsToAdd.length === 0) {
        alert("All products from this code that belong to you are already in the cart.");
        return;
      }
  
      // Now, use join on the array of product IDs
      const joinedProductIds = newProductsToAdd
        .map((product) => product.productid)
        .join(",");
  
      // Make another API request to get product details based on the retrieved product IDs
      const productsResponse = await axios.get(
        `http://localhost:8081/epharm/getProductsByIds?ids=${joinedProductIds}`
      );
  
      console.log("Second API Response:", productsResponse.data);
  
      // Create a map to store product details from the second API by product ID
      const productDetailsMap = {};
      productsResponse.data.forEach((product) => {
        productDetailsMap[product.id] = product;
      });
  
      // Add only new products to the cart with the appropriate quantity and changability
      const updatedCart = [
        ...cart,
        ...newProductsToAdd.map((product) => {
          const productDetails = productDetailsMap[product.productid];
  
          if (!productDetails) {
            return null; // Skip products with missing details
          }
  
          const recommended = productDetails.recommended || "false";
  
          return {
            ...productDetails,
            quantity: parseInt(product.quantity) || 0, // Set quantity from the first API response
            changeable: recommended === "false", // Set changability based on recommendation
            enteredCode: enteredCode, // Store the entered code with the product
          };
        }).filter(Boolean), // Filter out null values
      ];
  
      console.log("Updated Cart:", updatedCart);
  
      // Update the list of entered codes
      setEnteredCodes([...enteredCodes, enteredCode]);
  
      // Update cart state
      setCart(updatedCart);
      setEnteredCode(""); // Clear the enteredCode state here
  
      // Update local storage
      updateLocalStorage(updatedCart);
    } catch (error) {
      console.error("Error searching for products by code:", error);
    }
  };
  
  
  
  
  

// ... (previous code)

  

  const removeProductFromCart = (productId) => {
    console.log("Removing product with ID:", productId);

    const updatedCart = cart.filter((item) => item.id !== productId);
    console.log("Updated Cart after removal:", updatedCart);

    setCart(updatedCart);

    // Update local storage
    updateLocalStorage(updatedCart);
  };

  // Check if the cart is empty and clear enteredCodes
  useEffect(() => {
    if (cart.length === 0) {
      setEnteredCodes([]);
    }
  }, [cart]);

  return (
    <MDBContainer>
      <MDBRow className="cart-container">
        <MDBCol size="12" className="search-container">
          <MDBInput
            type="text"
            label="Enter Code"
            value={enteredCode}
            onChange={(e) => setEnteredCode(e.target.value)}
          />
          <MDBBtn onClick={handleCodeSearch}>Search Code</MDBBtn>
        </MDBCol>
        <MDBCol size="12" className="scrolling-container">
          {cart.length > 0 ? (
            <div className="scrolling-products">
              {cart.map((product) => (
                <div key={product.id} className="cart-item">
                  <div className="cart-item-image">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      width="80"
                      height="80"
                    />
                  </div>
                  <div className="cart-item-details">
                    <h2 className="cart-item-title">{product.name}</h2>
                    <p className="cart-item-price">Price: ${product.price}</p>
                    {product.recommended === "true" ? (
                      <div className="quantity-control">
                        <MDBInput
                          type="number"
                          label="Quantity"
                          value={product.quantity}
                          onChange={(e) => {
                            const newQuantity = parseInt(e.target.value, 10);
                            if (!isNaN(newQuantity) && newQuantity >= 0) {
                              const updatedCart = cart.map((item) => {
                                if (item.id === product.id) {
                                  item.quantity = newQuantity;
                                }
                                return item;
                              });
                              setCart(updatedCart);
                              updateLocalStorage(updatedCart);
                            }
                          }}
                        />
                      </div>
                    ) : (
                      <div className="quantity-control">
                        <span>Quantity: {product.quantity}</span>
                      </div>
                    )}
                    <div>
                      <MDBBtn
                        color="danger"
                        onClick={() => removeProductFromCart(product.id)}
                      >
                        Remove
                      </MDBBtn>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </MDBCol>
        <MDBCol size="12" className="total-container">
          <div className="total-items">Total Items: {cart.length}</div>
          <div className="total-price">Total Price: ${calculateTotalPrice()}</div>
          <Link to="/Checkout">
            <MDBBtn color="success">Buy Now</MDBBtn>
          </Link>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default AddToCart;
