import React from 'react';
import { useParams } from 'react-router-dom';
import CustomerData from '../../../customer_data.json';

const CustomerDetail = () => {
  const { customerId } = useParams();
  const customer = CustomerData.find((c) => c.customerId === customerId);

  if (!customer) {
    return <div>Customer not found</div>;
  }

  return (
    <div>
      <h2>Customer Details</h2>
      <p>Name: {customer.name}</p>
      <p>Customer ID: {customer.customerId}</p>
      <p>Status: {customer.status}</p>
      <p>Address: {customer.address}</p>
      <p>Email: {customer.email}</p>
      <p>Age: {customer.age}</p>
      <p>Phone Number: {customer.phoneNumber}</p>
    </div>
  );
};

export default CustomerDetail;
