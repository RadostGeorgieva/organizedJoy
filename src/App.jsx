
import React from "react";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import CollectionPage from "./pages/CollectionPage";
import { Route, createRoutesFromElements, createBrowserRouter, RouterProvider } from "react-router-dom";
import { supabase } from './lib/supabase';
import { useEffect } from "react";
//import "./events.css"; //




const App = () => {


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/collection' element={<CollectionPage />} />
      </Route>
    )
  );
useEffect(() => {
  const testInsert = async () => {
    const { data } = await supabase.auth.getUser();
console.log("Current user:", data.user);



  };

  testInsert();
}, []);
useEffect(() => {
  const testSelect = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*");

    console.log("Profiles read:", data, error);
  };

  testSelect();
}, []);


  return (<RouterProvider router={router} />)
}

export default App;
