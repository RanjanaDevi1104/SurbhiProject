// import jwt from "jsonwebtoken";

// const imagekitMiddleware = (requiredRole) => {
//   return (req, res, next) => {

//     const token = req.headers.token;  

//     if (!token) {
//       return res.status(401).json({ message: "Token not found" });
//     }

//     try {
//       const decoded = jwt.verify(token, process.env.secret_key);

//       if (requiredRole && decoded.role !== requiredRole) {
//         return res.status(403).json({ message: "Access denied" });
//       }

//       req.user = decoded;
//       next();

//     } catch (err) {
//   console.log("JWT Error Details:", err.message); // 🔥 Terminal mein check karein kya error hai
//   return res.status(401).json({ message: "Invalid token: " + err.message });
// }
//   };
// };

// export default imagekitMiddleware;




import jwt from "jsonwebtoken";

const imagekitMiddleware = (requiredRole) => {
  return (req, res, next) => {
    const token = req.headers.token;  
    
    // 1. अगर .env वाली चाबी न मिले, तो सीधे "SurbhiProject" इस्तेमाल करो
    const secret = process.env.secret_key || "SurbhiProject"; 

    if (!token) {
      console.log("❌ Error: Token not found in headers");
      return res.status(401).json({ message: "Token not found" });
    }

    try {
      // 2. वेरीफाई करें
      const decoded = jwt.verify(token, secret);

      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({ message: "Access denied" });
      }

      req.user = decoded;
      next();

    } catch (err) {
      console.log("❌ JWT Error:", err.message);
      return res.status(401).json({ message: "Invalid token: " + err.message });
    }
  };
};

export default imagekitMiddleware;