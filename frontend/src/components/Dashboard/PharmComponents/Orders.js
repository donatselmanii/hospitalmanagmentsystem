import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBBadge } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/epharm/orders')
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  const handleStatusUpdate = async (orderId) => {
    const selectedOrder = orders.find((order) => order.id === orderId);
    if (selectedOrder && selectedOrder.status === 'Processing') {
      try {
        const response = await axios.put(`http://localhost:8081/epharm/orders/${orderId}`, {
          status: 'Sent',
        });

        if (response.status === 200) {
          const updatedOrders = orders.map((order) => {
            if (order.id === orderId) {
              return { ...order, status: 'Sent' };
            }
            return order;
          });

          setOrders(updatedOrders);
        }
      } catch (error) {
        console.error('Error updating order status:', error);
      }
    } else {
      alert('You can only update the status from "Processing" to "Sent".');
    }
  };

  return (
    <div>
      <h1>My Orders</h1>
      <MDBTable style={{ marginLeft: '300px', width: '1150px' }}>
        <MDBTableHead>
          <tr>
            <th>Order ID</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Phone</th>
            <th>City</th>
            <th>Address</th>
            <th>Email</th>
            <th>Order Date</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Gift Code</th>
            <th>Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.name}</td>
              <td>{order.surname}</td>
              <td>{order.phone}</td>
              <td>{order.city}</td>
              <td>{order.address}</td>
              <td>{order.email}</td>
              <td>{order.orderdate}</td>
              <td>${order.total}</td>
              <td>
                {order.status === 'Processing' ? (
                  <MDBBadge color='primary' pill>
                    {order.status}
                  </MDBBadge>
                ) : (
                  <MDBBadge color='success' pill small>
                    {order.status}
                  </MDBBadge>
                )}
              </td>
              <td>{order.giftcode}</td>
              <td>
                <Link to={`/order/${order.id}`}>
                  <MDBBtn color='primary' size='sm'>
                    View Details
                  </MDBBtn>
                </Link>
                {order.status === 'Processing' && (
                  <MDBBtn
                    color='success'
                    size='sm'
                    onClick={() => handleStatusUpdate(order.id)}
                  >
                    Update Status
                  </MDBBtn>
                )}
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
}

export default Orders;
