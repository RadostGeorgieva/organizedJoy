
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
  console.log('App mounted');
  (async () => {
    const { data, error } = await supabase.auth.getSession();
    console.log('Supabase session check:', { data, error });
  })();
}, []);
  return (<RouterProvider router={router} />)
}

export default App;
