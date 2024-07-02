import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CustomerDetail = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/customers/${customerId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(setCustomer)
      .catch(error => console.log("Error fetching data:", error.message));
  }, [customerId]);

  const goBack = () => {
    navigate(-1); // Navigates back to the previous page
  };

  if (!customer) {
    return <div className="text-center p-5">Customer not found</div>;
  }

  return (
    <div className="flex justify-center p-5">
      <div className="card w-full max-w-4xl bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title flex justify-between">
            {customer.name}
            <button className="btn btn-ghost" onClick={goBack}>&larr; Back</button>
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <p><strong>Customer ID:</strong> {customer.customerId}</p>
            <p><strong>Status:</strong> {customer.status}</p>
            <p><strong>Address:</strong> {customer.address}</p>
            <p><strong>Email:</strong> {customer.email}</p>
            <p><strong>Age:</strong> {customer.age}</p>
            <p><strong>Phone Number:</strong> {customer.phoneNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;