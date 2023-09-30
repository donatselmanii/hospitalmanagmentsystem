import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from 'mdb-react-ui-kit';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


function OrderDetail() {
    const { orderId } = useParams();
    const [orderDetails, setOrderDetails] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [error, setError] = useState(null);
    const [idnum, setIdnum] = useState('');
    const [role, setRole] = useState('');
    const taxRate = 0.18;

    useEffect(() => {
        axios.get('http://localhost:8081/login/rolecheck', { withCredentials: true })
            .then((response) => {
                const { role, idnum } = response.data;
                setIdnum(idnum);
                setRole(role);

                if (role === 'pharm') {
                    fetchOrderDetails(orderId);
                } else {
                    axios.get(`http://localhost:8081/epharm/orderdetail/${orderId}`)
                        .then((response) => {
                            const { clientid } = response.data;
                            console.log(idnum, clientid);

                            if (clientid !== undefined && idnum === clientid) {
                                fetchOrderDetails(orderId);
                            } else {
                                setError('Not Found 404!');
                            }
                        })
                        .catch((error) => {
                            if (error.response && error.response.status === 403) {
                                setError('Not Found 404!');
                            } else {
                                setError('Error fetching order details.');
                            }
                        });

                }
            })
            .catch((error) => {
                console.error('Error fetching user role:', error);
            });
    }, [orderId]);

    const fetchOrderDetails = (orderId) => {
        axios.get(`http://localhost:8081/epharm/orderdetail/${orderId}`)
            .then((response) => {
                setOrderDetails(response.data);
                const calculatedSubtotal = response.data.reduce(
                    (total, orderDetail) => total + orderDetail.totalprice,
                    0
                );
                setSubtotal(calculatedSubtotal);
            })
            .catch((error) => {
                setError('Error fetching order details.');
            });
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (orderDetails.length === 0) {
        return <div>Loading...</div>;
    }

    const calculateTotalWithTax = () => {
        const totalWithTax = subtotal * (1 + taxRate);
        return totalWithTax.toFixed(2);
    };

    const printBill = () => {
        const doc = new jsPDF();

        doc.text('Order Details', 10, 10);
        doc.autoTable({
            head: [['Product Name', 'Product Price', 'Quantity', 'Total Price']],
            body: orderDetails.map((orderDetail) => [
                orderDetail.name,
                `$${orderDetail.productprice}`,
                orderDetail.quantity,
                `$${orderDetail.totalprice.toFixed(2)}`,
            ]),
        });

        const startY = doc.autoTable.previous.finalY + 10;
        doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 10, startY);
        doc.text(`Tax (18%): $${(subtotal * taxRate).toFixed(2)}`, 10, startY + 10);
        doc.text(`Total (including tax): $${calculateTotalWithTax()}`, 10, startY + 20);

        doc.save('order_bill.pdf');
    };

    return (
        <div>
            <h2>Order Details</h2>
            <MDBTable align='middle'>
                <MDBTableHead>
                    <tr>
                        <th>Product Name</th>
                        <th>Product Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {orderDetails.map((orderDetail) => (
                        <tr key={orderDetail.id}>
                            <td>{orderDetail.name}</td>
                            <td>${orderDetail.productprice}</td>
                            <td>{orderDetail.quantity}</td>
                            <td>${orderDetail.totalprice.toFixed(2)}</td>
                        </tr>
                    ))}
                </MDBTableBody>
            </MDBTable>

            <div>
                <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
                <p><strong>Tax (18%):</strong> ${(subtotal * taxRate).toFixed(2)}</p>
                <p><strong>Total (including tax):</strong> ${calculateTotalWithTax()}</p>
            </div>

            <MDBBtn onClick={printBill} color='primary'>
                Download Bill (PDF)
            </MDBBtn>
        </div>
    );
}

export default OrderDetail;
