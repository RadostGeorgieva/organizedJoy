
import React from "react";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import CollectionPage from "./pages/CollectionPage";
import { Route, createRoutesFromElements, createBrowserRouter, RouterProvider } from "react-router-dom";
import "./events.css"; //




const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/collection' element={<CollectionPage />} />
      </Route>
    )
  );
  return (<RouterProvider router={router} />)
}
export default App;
