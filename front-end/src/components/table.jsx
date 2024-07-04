import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerTable = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);

  //Modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);  
  const [showAddModal, setShowAddModal] = useState(false);

  const [newCustomer, setNewCustomer] = useState({
    name: '',
    status: 'inactive', // Default to 'Inactive'
    address: '',
    email: '',
    age: '',
    phoneNumber: ''
  });

  //Search
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/customers');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching data: ', error.message);
      }
    };

    fetchData();
  }, []);

  const deleteCustomer = async (customerId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/customers/${customerId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete the customer');
      }
      setCustomers(customers.filter(customer => customer.customerId !== customerId));
      setShowDeleteModal(false);
      console.log("Customer deleted successfully");
    } catch (error) {
      console.error('Error deleting customer:', error.message);
    }
  };

  const UpdateCustomer = async (customerId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/customers/${customerId}`, {
        method: 'PUT', // Using PUT to update the customer
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedCustomer) // Sending updated customer data
      });
      if (!response.ok) {
        throw new Error('Failed to update the customer');
      }
      // Optionally parse the response if you expect any data back
      const updatedCustomer = await response.json();
  
      // Update the local state to reflect the change
      setCustomers(customers.map(customer => 
        customer.customerId === customerId ? updatedCustomer : customer
      ));
  
      // Close the modal after updating
      setShowEditModal(false);
      console.log("Customer updated successfully");
    } catch (error) {
      console.error('Error updating customer:', error.message);
    }
  };

  const addCustomer = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCustomer)
      });
      if (!response.ok) {
        throw new Error('Failed to add the customer');
      }
      const addedCustomer = await response.json();
      setCustomers([...customers, addedCustomer]);
      setShowAddModal(false);
      setNewCustomer({
        name: '',
        customerId:'',
        status: '',
        address: '',
        email: '',
        age: '',
        phoneNumber: ''
      });
      console.log('Customer added successfully');
    } catch (error) {
      console.error('Error adding customer:', error.message);
    }
  };

  const onRowClick = (customerId) => {
    navigate(`/details/${customerId}`);
  };

  const handleEdit = (customer, event) => {
    event.stopPropagation();  // Prevent the row click event
    setSelectedCustomer(customer);
    setShowEditModal(true);
  };
  
  const handleDelete = (customer, event) => {
    event.stopPropagation();  // Prevent the row click event
    setSelectedCustomer(customer);
    setShowDeleteModal(true);
  };
  
  const closeModal = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
    setSelectedCustomer(null);  // Clear selected customer state
  };

  return (
    <div className='p-4'>
    <div className='flex justify-between items-center m-2'>
      <div className="flex-none">
        <div className="form-control">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        </div>
      </div>
      <button className="btn btn-outline" onClick={() => setShowAddModal(true)}>Add Customer</button>

    </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Customer ID</th>
              <th>Status</th>
              <th>Address</th>
              <th>Email</th>
              <th>Age</th>
              <th>Phone Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {customers.filter((customer) =>
            customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.customerId.toString().includes(searchTerm) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase())
          ).map((customer) => (
              <tr key={customer.customerId}
                className="hover:bg-gray-200 cursor-pointer"
                onClick={() => onRowClick(customer.customerId)}
                >
                <td>
                  <input type="checkbox" className="checkbox" onClick={(e) => e.stopPropagation()} />
                </td>
                <td>{customer.name}</td>
                <td>{customer.customerId}</td>
                <td>{customer.status}</td>
                <td>{customer.address}</td>
                <td>{customer.email}</td>
                <td>{customer.age}</td>
                <td>{customer.phoneNumber}</td>
                <td>
                  <button className="btn btn-ghost btn-xs"  onClick={(e) => handleEdit(customer, e)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
  </svg>

                  </button>
                  <button className="btn btn-ghost btn-xs" onClick={(e) => handleDelete(customer, e)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
  </svg>

                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Customer ID</th>
              <th>Status</th>
              <th>Address</th>
              <th>Email</th>
              <th>Age</th>
              <th>Phone Number</th>
              <th>Action</th>
            </tr>
          </tfoot>

          {showEditModal && (
    <dialog open className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Edit Customer</h3>
        <p>Edit information for {selectedCustomer.name}.</p>
        <div className="modal-action">
          <button className="btn" onClick={closeModal}>Close</button>
        </div>
      </div>
    </dialog>
  )}

{showEditModal && (
  <dialog open className="modal modal-bottom sm:modal-middle">
    <div className="modal-box">
      <h3 className="font-bold text-lg">Edit Customer Details</h3>
      <form onSubmit={(e) => {
        e.preventDefault();
        UpdateCustomer(selectedCustomer.customerId);
        setShowEditModal(false);
      }}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" placeholder="Name" className="input input-bordered"
                 value={selectedCustomer.name}
                 onChange={(e) => setSelectedCustomer({...selectedCustomer, name: e.target.value})} />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Customer ID (not editable)</span>
          </label>
          <input type="text" disabled value={selectedCustomer.customerId} className="input input-bordered input-disabled" />
        </div>

        <div className="form-control mt-3 mb-3">
          <label className="label cursor-pointer">
            <span className="label-text">Active</span>
            <input type="checkbox" className="checkbox"
                   checked={selectedCustomer.status === "active"}
                   onChange={(e) => setSelectedCustomer({...selectedCustomer, status: e.target.checked ? "active" : "inactive"})} />
          </label>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Address</span>
          </label>
          <input type="text" placeholder="Address" className="input input-bordered"
                 value={selectedCustomer.address}
                 onChange={(e) => setSelectedCustomer({...selectedCustomer, address: e.target.value})} />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="Email" className="input input-bordered"
                 value={selectedCustomer.email}
                 onChange={(e) => setSelectedCustomer({...selectedCustomer, email: e.target.value})} />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Age</span>
          </label>
          <input type="number" placeholder="Age" className="input input-bordered"
                 value={selectedCustomer.age}
                 onChange={(e) => setSelectedCustomer({...selectedCustomer, age: parseInt(e.target.value, 10) || 0})} />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Phone Number</span>
          </label>
          <input type="text" placeholder="Phone Number" className="input input-bordered"
                 value={selectedCustomer.phoneNumber}
                 onChange={(e) => setSelectedCustomer({...selectedCustomer, phoneNumber: e.target.value})} />
        </div>

        <div className="modal-action">
          <button type="submit" className="btn btn-primary">Update</button>
          <button type="button" className="btn" onClick={closeModal}>Cancel</button>
        </div>
      </form>
    </div>
  </dialog>
)}

  {showDeleteModal && (
    <dialog open className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Are you sure you want to delete {selectedCustomer?.name}?</h3>
        <div className="modal-action">
          <button className="btn" onClick={() => deleteCustomer(selectedCustomer.customerId)}>Delete</button>
          <button className="btn" onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </dialog>
  )}

{showAddModal && (
  <dialog open className="modal modal-bottom sm:modal-middle">
    <div className="modal-box">
      <h3 className="font-bold text-lg">Add New Customer</h3>
      <form onSubmit={(e) => {
        e.preventDefault();
        addCustomer();
        setShowAddModal(false);
      }}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" placeholder="Name" className="input input-bordered"
                 value={newCustomer.name}
                 onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})} />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Customer ID</span>
          </label>
          <input type="text" placeholder="Name" className="input input-bordered"
                 value={newCustomer.customerId}
                 onChange={(e) => setNewCustomer({...newCustomer, customerId: e.target.value})} />
        </div>

        <div className="form-control mt-3 mb-3">
          <label className="label cursor-pointer">
            <span className="label-text">Active</span>
            <input type="checkbox" className="checkbox"
                   checked={newCustomer.status === "active"}
                   onChange={(e) => setNewCustomer({...newCustomer, status: e.target.checked ? "active" : "inactive"})} />
          </label>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Address</span>
          </label>
          <input type="text" placeholder="Address" className="input input-bordered"
                 value={newCustomer.address}
                 onChange={(e) => setNewCustomer({...newCustomer, address: e.target.value})} />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="Email" className="input input-bordered"
                 value={newCustomer.email}
                 onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})} />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Age</span>
          </label>
          <input type="number" placeholder="Age" className="input input-bordered"
                 value={newCustomer.age}
                 onChange={(e) => setNewCustomer({...newCustomer, age: parseInt(e.target.value, 10) || 0})} />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Phone Number</span>
          </label>
          <input type="text" placeholder="Phone Number" className="input input-bordered"
                 value={newCustomer.phoneNumber}
                 onChange={(e) => setNewCustomer({...newCustomer, phoneNumber: e.target.value})} />
        </div>

        <div className="modal-action">
          <button type="submit" className="btn btn-primary">Add</button>
          <button type="button" className="btn" onClick={() => setShowAddModal(false)}>Cancel</button>
        </div>
      </form>
    </div>
  </dialog>
)}

        </table>
      </div>
    </div>
    
  );
};

export default CustomerTable;
