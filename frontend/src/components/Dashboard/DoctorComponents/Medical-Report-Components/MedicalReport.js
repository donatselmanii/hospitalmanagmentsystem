import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBBtn,
  MDBContainer,
} from 'mdb-react-ui-kit';

function MedicalReport() {
  const { appointmentId } = useParams();
  const [doctorId, setDoctorId] = useState('');
  const [reportId, setReportId] = useState('');
  const [idnum, setIdnum] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [checkoutCode, setCheckoutCode] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        if (searchTerm) {
          const response = await axios.get(`http://localhost:8081/epharm/products/find?search=${searchTerm}`);
          setProducts(response.data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, [searchTerm]);

  const addToCart = (product, newQuantity) => {
    if (isNaN(newQuantity) || newQuantity < 1) {
      return;
    }

    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex((item) => item.id === product.id);

    if (productIndex !== -1) {
      updatedCart[productIndex].quantity = newQuantity;
    } else {
      product.quantity = newQuantity;
      updatedCart.push(product);
    }

    setCart(updatedCart);
  };

  const removeFromCart = (product) => {
    const updatedCart = cart.filter((item) => item.id !== product.id);
    setCart(updatedCart);
  };

  useEffect(() => {
    async function fetchDoctorPatientInfo() {
      try {
        const response = await axios.get(`http://localhost:8081/appointments/user-report/${appointmentId}`);
        console.log('API Response:', response.data);
        setDoctorId(response.data.doctorid);
        setIdnum(response.data.idnum);
      } catch (error) {
        console.error('Error fetching doctor info:', error);
      }
    }

    fetchDoctorPatientInfo();
  }, [appointmentId]);

  useEffect(() => {
    async function fetchLatestReportID() {
      try {
        if (doctorId !== '' && appointmentId !== '') {
          const response = await axios.get(`http://localhost:8081/appointments/user-report-latest/${doctorId}/${appointmentId}`);
          setReportId(response.data.reportId);
        }
      } catch (error) {
        console.error('Error fetching latest report id:', error);
      }
    }

    if (doctorId !== '' && appointmentId !== '') {
      fetchLatestReportID();
    }
  }, [doctorId, appointmentId]);

  const [userEmail, setUserEmail] = useState(''); // Initialize userEmail state

  useEffect(() => {
    async function fetchUserEmail() {
      try {
        const response = await axios.get('http://localhost:8081/login/rolecheck', { withCredentials: true });
        const { email } = response.data;
        setUserEmail(email);
      } catch (error) {
        console.error('Error fetching user email:', error);
      }
    }

    fetchUserEmail();
  }, []);

  // ... (Rest of the code)

  const handleCheckout = async () => {
    try {
      const newCheckoutCode = generateRandomCode(12);
      setCheckoutCode(newCheckoutCode);
  
      if (reportId === '') {
        const reportResponse = await axios.get(`http://localhost:8081/appointments/user-report-latest/${doctorId}`);
        setReportId(reportResponse.data.reportId);
      }
  
      const insertionPromises = cart.map(async (product) => {
        const orderData = {
          reportid: reportId,
          productid: product.id,
          quantity: product.quantity,
          code: newCheckoutCode,
        };
  
        try {
          const orderResponse = await axios.post("http://localhost:8081/appointments/user-report/insert/medicine", orderData);
          return orderResponse;
        } catch (error) {
          console.error("Error inserting product:", error);
          return { data: { Status: "Failed" } };
        }
      });
  
      const insertionResults = await Promise.all(insertionPromises);
      await axios.post('http://localhost:8081/users/send-email', {
          recipient: userEmail,
          subject: 'Your Checkout Code',
          message: `Dear [Recipient's Name],

Thank you for choosing our service. Your unique checkout code is: ${newCheckoutCode}.

This code provides access to the products recommended by your doctor. To view and purchase these products, please follow these steps:

1. Visit our website at [Your Website URL].
2. Log in to your account or create a new account if you haven't already.
3. Navigate to the "My Cart" or "Checkout" section.
4. Paste the checkout code (${newCheckoutCode}) in the designated field.
5. Click "Apply" or "Submit" to view and confirm your selected products.
6. Complete the checkout process to place your order.

If you have any questions or need assistance, please don't hesitate to contact our support team at 
labkursi@hotmail.com or +1 000 000 000.

Thank you for trusting us with your healthcare needs. We look forward to serving you.

Best regards,
[Your Company Name]
`

        });

        setCart([]);
  

    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <MDBContainer>
      <h2>Product Search</h2>
      <MDBInput
        label="Search for products"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <MDBListGroup>
          {products.map((product) => (
            <MDBListGroupItem key={product.id}>
              {product.name} - ${product.price}
              <MDBInput
                type="number"
                min="1"
                value={product.quantity || ""}
                onChange={(e) => {
                  const newQuantity = parseInt(e.target.value, 10);
                  addToCart(product, newQuantity);
                }}
              />
              <MDBBtn color="primary" onClick={() => addToCart(product, product.quantity || 1)}>
                Add to Cart
              </MDBBtn>
            </MDBListGroupItem>
          ))}
        </MDBListGroup>
      )}

      <h2>Cart</h2>
      <MDBListGroup>
        {cart.map((product) => (
          <MDBListGroupItem key={product.id}>
            {product.name} - ${product.price} (Quantity: {product.quantity || 1})
            <MDBBtn color="danger" onClick={() => removeFromCart(product)}>
              Remove
            </MDBBtn>
          </MDBListGroupItem>
        ))}
      </MDBListGroup>

      <MDBBtn color="success" onClick={handleCheckout}>
        Checkout
      </MDBBtn>
    </MDBContainer>
  );
}

export default MedicalReport;

function generateRandomCode(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }

  return code;
}
