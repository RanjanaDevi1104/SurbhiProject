import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // Debugging ke liye (F12 daba kar Console mein check karein)
  console.log("Current Token:", token);

  // Agar token nahi hai, ya token ki value "undefined" ya "null" string hai
  if (!token || token === "undefined" || token === "null") {
    return <Navigate to="/" replace />;
  }

  // Agar token hai toh page dikhao
  return children;
};

export default ProtectedRoute;
