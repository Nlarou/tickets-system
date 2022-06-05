const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protectedRoute = function await(role = ["regular", "staff", "admin"]) {
  return asyncHandler(async (req, res, next) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        //get the token from header
        token = req.headers.authorization.split(" ")[1];

        //Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // get user from token
        req.user = await User.findById(decoded.id).select("-password");
        next();
      } catch (err) {
        console.log(err);
        res.status(401);
        throw new Error("Not authorized " + err);
      }
    }
    if (!token) {
      res.status(401);
      throw new Error("Not authorized: Token not found");
    }
    if (!role?.includes(req.user?.role) || !role) {
      res.status(401);
      throw new Error("Not authorized: Wrong role");
    }
  });
};

module.exports = { protectedRoute };
