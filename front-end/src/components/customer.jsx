import React from 'react';
import { useParams } from 'react-router-dom';
import CustomerData from '../../../customer_data.json';
import '../styles/Customer.css'; // Add your custom CSS file

const CustomerDetail = () => {
  const { customerId } = useParams();
  const customer = CustomerData.find((c) => c.customerId === customerId);

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
