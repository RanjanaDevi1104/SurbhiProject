
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from './Components/Footer';
import WhatsAppFloat from "./Components/WhatsappFloat";
import ProtectedRoute from "./Components/ProtectedRoute";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Services from "./Pages/Services";
import Booking from "./Pages/Booking";
import Contact from "./Pages/Contact";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Workbook from "./Pages/Workbook";
import AdminDashboard from "./Pages/AdminDashboard";
import Logout from "./Pages/Logout";
import LightAudio from './Pages/AudioUser';


function Layout() {
  const location = useLocation();
  
 
  const isAdminPage = location.pathname === "/admin";

  return (
    <>
      {/* Agar admin page nahi hai, tabhi Navbar aur WhatsApp dikhao */}
      {!isAdminPage && <Navbar />}
      {!isAdminPage && <WhatsAppFloat />}

      <div className={!isAdminPage ? "pt-20" : ""}>
        <Routes>
          {/* --- PUBLIC ROUTES --- */}
          <Route path="/" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<Signup />} />

          {/* --- PROTECTED ROUTES --- */}
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
          <Route path="/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
          <Route path="/booking" element={<ProtectedRoute><Booking /></ProtectedRoute>} />
          <Route path="/workbook" element={<ProtectedRoute><Workbook /></ProtectedRoute>} />
          <Route path="/audio" element={<ProtectedRoute><LightAudio/></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />

          {/* ADMIN ROUTE */}
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard/></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      
      {/* Agar admin page nahi hai, tabhi Footer dikhao */}
      {!isAdminPage && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}