//protects route by validating the token in request header.
//Check if the request contains a valid authentication token
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    //extract
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access denied, no token provided");
    }

    if (token.startswith("Bearer")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verifyToken(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
