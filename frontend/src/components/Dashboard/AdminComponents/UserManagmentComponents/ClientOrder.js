import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MDBTable, MDBTableHead, MDBTableBody, MDBBadge, MDBBtn } from 'mdb-react-ui-kit';

function ClientOrder() {
  const [orders, setOrders] = useState([]);
  const [idnum, setIdnum] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/login/rolecheck', { withCredentials: true });
      const { idnum } = response.data;
      setIdnum(idnum);
    } catch (error) {
      console.error('Error fetching user idnum:', error);
      navigate('/login');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (idnum) {
      axios.get(`http://localhost:8081/epharm/myorders/${idnum}`)
        .then((response) => {
          setOrders(response.data);
        })
        .catch((error) => {
          console.error('Error fetching user orders:', error);
        });
    }
  }, [idnum]);

  const handleStatusUpdate = async (orderId) => {
    const selectedOrder = orders.find((order) => order.id === orderId);
    if (selectedOrder && selectedOrder.status === 'Sent') {
      try {
        const response = await axios.put(`http://localhost:8081/epharm/orders/${orderId}`, {
          status: 'Received',
        });

        if (response.status === 200) {
          const updatedOrders = orders.map((order) => {
            if (order.id === orderId) {
              return { ...order, status: 'Received' };
            }
            return order;
          });

          setOrders(updatedOrders);
        }
      } catch (error) {
        console.error('Error updating order status:', error);
      }
    } else {
      alert('You can only update the status from "Sent" to "Received".');
    }
  };

  return (
    <div>
      <h1>My Orders</h1>
      {idnum === undefined && (
        <p>Please <a href="/login">login</a> to view your orders.</p>
      )}
      {idnum !== undefined && orders.length === 0 && (
        <p>You have not made any orders yet.</p>
      )}
      {idnum !== undefined && orders.length > 0 && (
        <MDBTable style={{ marginLeft: '300px', width: '1150px' }}>
          <MDBTableHead>
            <tr>
              <th>Order ID</th>
              <th>Order Date</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
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
                <td>
                  {order.status === 'Sent' && (
                    <MDBBtn onClick={() => handleStatusUpdate(order.id)} color='primary'>
                        Update Status
                  </MDBBtn>
                  )}
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      )}
    </div>
  );
}

export default ClientOrder;
