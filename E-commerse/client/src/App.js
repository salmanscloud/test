import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./cart/Cart";
import Checkout from "./checkout/Checkout";
import Home from "./home/Home";
import Nav from "./nav/Nav";
import AdminRoute from "./routes/AdminRoute";
import PrivateRoute from "./routes/PrivateRoute";
import AdminDashboard from "./user/adminDashboard/AdminDashboard";
import UserDashboard from "./user/userDashboard/UserDashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/user/dashboard"
          element={
            <PrivateRoute>
              <UserDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
