import jwt from "jsonwebtoken";

const imagekitMiddleware = (requiredRole) => {
  return (req, res, next) => {

    const token = req.headers.token;  // direct token

    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({ message: "Access denied" });
      }

      req.user = decoded;
      next();

    } catch (err) {
  console.log("JWT Error Details:", err.message); // 🔥 Terminal mein check karein kya error hai
  return res.status(401).json({ message: "Invalid token: " + err.message });
}
  };
};

export default imagekitMiddleware;