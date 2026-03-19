import jwt from 'jsonwebtoken';

const LoginMiddleware = (requiredRole) => {
  return (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    try {
      const decode = jwt.verify(token, process.env.secret_key);

      req.role = decode.role;

      if (requiredRole && decode.role !== requiredRole) {
        return res.status(403).json({ message: "Access Denied" });
      }

      next();
    } catch (err) {
      console.log("JWT ERROR:", err.message);
      return res.status(401).json({ message: "Invalid Token" });
    }
  };
};

export default LoginMiddleware;
