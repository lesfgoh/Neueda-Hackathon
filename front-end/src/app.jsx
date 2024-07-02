// src/App.jsx
import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import CustomerTable from './components/table';
import CustomerDetail from './components/customer';
import Layout from './components/Layout'; // Make sure to import Layout
import './styles/app.css';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<CustomerTable />} />
            <Route path="details/:customerId" element={<CustomerDetail />} />
        </Route>
    )
);

function App() {
    return (
      <RouterProvider router={router} />
    );
}

export default App;
