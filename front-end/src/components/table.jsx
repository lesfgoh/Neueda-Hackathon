import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { useNavigate } from 'react-router-dom';
import CustomerData from '../../../customer_data.json';

// Create new GridExample component
const CustomerTable = () => {
  const navigate = useNavigate();
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState(CustomerData);

  // Column Definitions: Defines & controls grid columns.
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
  };

  const onRowClicked = (event) => {
    const customerId = event.data.customerId;
    navigate(`/details/${customerId}`);
  };

  return (
    <div style={{ height: '500px', width: '100%', position: 'absolute' }}>
      <div style={{ height: '50px', width: '100%', display: 'flex', alignItems: 'center' }}>
        <h2>Bank Customers</h2>
      </div>
      <div className="ag-theme-quartz" style={{ height: '100%' }}>
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
