import React from "react";
import "./app.scss";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Gigs from "./pages/gigs/Gigs";
import Gig from "./pages/gig/Gig";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Add from "./pages/add/Add";
import Orders from "./pages/orders/Orders";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import MyGigs from "./pages/myGigs/MyGigs";
// import Pay from "./pages/pay/Pay";
import Layout from "./Layout";
import Success from "./pages/success/Success";
import CheckoutForm from "./components/checkout/CheckoutForm";
import getCurrentUser from "./helpers/getCurrentUser";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <div style={{ margin: 0 }}>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <ToastContainer />
        <Routes>
          {/* unprotected route  */}
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/gigs" element={<ProtectedRoute><Gigs /></ProtectedRoute>} />
            <Route path="/myGigs" element={<ProtectedRoute><MyGigs /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
            <Route path="/message/:id" element={<ProtectedRoute><Message /></ProtectedRoute>} />
            <Route path="/add" element={<ProtectedRoute><Add /></ProtectedRoute>} />
            <Route path="/gig/:id" element={<ProtectedRoute><Gig /></ProtectedRoute>} />
            <Route path="/pay/:id" element={<ProtectedRoute><CheckoutForm /></ProtectedRoute>} />
            <Route path="/success" element={<ProtectedRoute><Success /></ProtectedRoute>} />
          </Route>
        </Routes>
        <Footer />
      </QueryClientProvider>
    </div>
  );
};

const ProtectedRoute = ({ children }) => {
  const user = getCurrentUser();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default App;