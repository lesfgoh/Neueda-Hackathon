import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Customer.css'; // Add your custom CSS file

const CustomerDetail = () => {
  const { customerId } = useParams();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/customers/${customerId}`)
      .then(response => response.json())
      .then((data) => {
        setCustomer(data);
      })
      .catch(error => console.log(error));
  }, []);

  if (!customer) {
    return <div className="customer-not-found">Customer not found</div>;
  }

  return (
    <div className="customer-detail-container">
      <div className="customer-detail-card">
        <h2>Customer Details</h2>
        <p><strong>Name:</strong> {customer.name}</p>
        <p><strong>Customer ID:</strong> {customer.customerId}</p>
        <p><strong>Status:</strong> {customer.status}</p>
        <p><strong>Address:</strong> {customer.address}</p>
        <p><strong>Email:</strong> {customer.email}</p>
        <p><strong>Age:</strong> {customer.age}</p>
        <p><strong>Phone Number:</strong> {customer.phoneNumber}</p>
      </div>
    </div>
  );
};

export default CustomerDetail;
