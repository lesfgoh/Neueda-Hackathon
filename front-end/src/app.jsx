import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import CustomerTable from './components/table';
import CustomerDetail from './components/customer';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route index element={<CustomerTable />} />
            <Route path="details/:customerId" element={<CustomerDetail />} />
        </Route>
    )
)

function App({routes}) {
    return (
      <>
        <RouterProvider router={router}/>
      </>
    );
  }

  export default App;