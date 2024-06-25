import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import CustomerData from "../../customer_data.json";

// Create new GridExample component
const GridExample = () => {
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

  // Container: Defines the grid's theme & dimensions.
  return (
    <div style={{height: '500px', width: '100%', position: 'absolute'}}>
      <div
        className={
          "ag-theme-quartz"
        }
        style={{height: '100%'}}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
        />
      </div>
    </div>
    
  );
};

// Render GridExample
const root = createRoot(document.getElementById("root"));
root.render(<GridExample />);