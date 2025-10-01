
import React from "react";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import { Route, createRoutesFromElements, createBrowserRouter, RouterProvider } from "react-router-dom";
import "./events.css"; //




const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
      </Route>
    )
  );
  return (<RouterProvider router={router} />)
}
export default App;
