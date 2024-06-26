import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { useNavigate } from 'react-router-dom';
import '../styles/Table.css';

const CustomerTable = () => {
  const navigate = useNavigate();
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/customers');
        if (!response.ok) {
          throw new Error('Response not ok');
        }
        const result = await response.json();
        setRowData(result);
      } catch (error) {
        console.log('No data');
      }
    }
    fetchData();
  }, []);

  const [colDefs, setColDefs] = useState([
    { field: "name" },
    { field: "customerId" },
    { field: "status" },
    { field: "address" },
    { field: "email" },
    { field: "age" },
    { field: "phoneNumber" },
  ]);

  const defaultColDef = {
    flex: 1,
    sortable: true,
    filter: true,
    resizable: true,
  };

  const onRowClicked = (event) => {
    const customerId = event.data.customerId;
    navigate(`/details/${customerId}`);
  };

  return (
    <div className="customer-table-container">
      <div className="header-container">
        <h2>Bank Customers</h2>
      </div>
      <div className="ag-theme-quartz">
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          onRowClicked={onRowClicked}
        />
      </div>
    </div>
  );
};

export default CustomerTable;
