import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../css/Epharm/Epharm.css";
import {
  MDBModal,
  MDBModalContent,
  MDBModalHeader,
  MDBModalBody,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";

const CART_STORAGE_KEY = process.env.REACT_APP_CART_STORAGE_KEY;

const Checkout = () => {
  const [userData, setUserData] = useState({
    idnum: "",
    name: "",
    city: "",
    address: "",
    phone: "",
  });

  const [productDetails, setProductDetails] = useState([]);
  const [giftcode, setGiftcode] = useState("");
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();
  const [showPaymentSuccessModal, setShowPaymentSuccessModal] = useState(false);

  useEffect(() => {
    fetchUserData();

    const storedCart = localStorage.getItem(CART_STORAGE_KEY);

    if (storedCart) {
      const cartData = JSON.parse(storedCart);
      setProductDetails(cartData);
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:8081/login/rolecheck", {
        withCredentials: true,
      });

      setUserData({
        idnum: response.data.idnum,
        name: response.data.name,
        city: response.data.city,
        address: response.data.address,
        phone: response.data.phone,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      navigate('/login');
    }
  };

  const calculateTotalPrice = () => {
    if (productDetails.length === 0) {
      return 0;
    }

    const totalPrice = productDetails.reduce((total, product) => {
      const itemPrice = parseFloat(product.price);
      const itemQuantity = parseInt(product.quantity);

      if (isNaN(itemPrice) || isNaN(itemQuantity)) {
        return total;
      }

      return total + itemPrice * itemQuantity;
    }, 0);

    return totalPrice.toFixed(2);
  };

  const handleCheckout = async () => {
    try {
      // Prepare the data for the order and include the gift code
      const orderData = {
        idnum: userData.idnum,
        totalprice: calculateTotalPrice(),
        giftcode: giftcode,
      };

      // Send a POST request to insert the order
      const orderResponse = await axios.post(
        "http://localhost:8081/epharm/Order",
        orderData
      );

      // Get the latest order ID from the response
      const orderId = orderResponse.data.insertId;

      console.log("Latest Order ID:", orderId);

      // Retrieve cart data from local storage
      const cartData = JSON.parse(localStorage.getItem(CART_STORAGE_KEY));

      // Create an array to store promises for each product insertion and code update
      const insertionPromises = [];

      // Use a for loop to iterate through each product in cartData
      for (const product of cartData) {
        const orderDetailData = {
          orderid: orderId,
          productid: product.id,
          productprice: product.price,
          quantity: product.quantity,
          totalprice: product.price * product.quantity,
        };

        // Push the promise returned by axios.post into the insertionPromises array
        insertionPromises.push(
          axios.post(
            "http://localhost:8081/epharm/OrderDetail",
            orderDetailData
          )
        );

        // Check if the product has an enteredCode and update the 'used' status in the database
        if (product.enteredCode) {
          insertionPromises.push(
            axios.put(`http://localhost:8081/epharm/updateCodeStatus/${product.enteredCode}`, {
              productIds: [product.id], // Ensure productIds is an array
            })
          );
        }
      }

      // Wait for all product insertions and database updates to complete before continuing
      await Promise.all(insertionPromises);

      // Clear the cart after successful checkout
      localStorage.removeItem(CART_STORAGE_KEY);

      // Show the payment success modal
      setShowPaymentSuccessModal(true);
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const handleModalClose = () => {
    setShowPaymentSuccessModal(false);

    // Navigate to /E-Pharmacy
    navigate('/E-Pharmacy');
  };

  return (
    <div className="checkout-container">
      <MDBRow>
        <MDBCol>
          <h2>User Information</h2>
          <MDBTable>
            <MDBTableBody>
              <tr>
                <td>Name:</td>
                <td>{userData.name}</td>
              </tr>
              <tr>
                <td>City:</td>
                <td>{userData.city}</td>
              </tr>
              <tr>
                <td>Address:</td>
                <td>{userData.address}</td>
              </tr>
              <tr>
                <td>Phone:</td>
                <td>{userData.phone}</td>
              </tr>
            </MDBTableBody>
          </MDBTable>
        
          <div className="giftcode-input">
            <MDBInput
              style={{ maxWidth: '400px' }}
              type="text"
              label="Enter Gift Code"
              value={giftcode}
              onChange={(e) => setGiftcode(e.target.value)}
            />
          </div>
          <div className="cart-summary">
            <h2>Cart Summary</h2>
            {productDetails.length > 0 ? (
              <div>
                <div className="total-price">
                  Total Price: ${calculateTotalPrice()}
                </div>
                <MDBBtn color="primary" onClick={handleCheckout}>
                  Checkout
                </MDBBtn>
              </div>
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
        </MDBCol>
      </MDBRow>

      {/* Payment Success Modal */}
      <MDBModal show={showPaymentSuccessModal} tabIndex="-1">
        <MDBModalContent>
          <MDBModalHeader>
            Payment Successful
          </MDBModalHeader>
          <MDBModalBody>
            <p>Your payment was successful.</p>
            <MDBBtn color="success" onClick={handleModalClose}>OK</MDBBtn>
          </MDBModalBody>
        </MDBModalContent>
      </MDBModal>
    </div>
  );
};

export default Checkout;
