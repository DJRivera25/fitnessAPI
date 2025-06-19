import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const createAccessToken = (user) => {
  const data = {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    mobileNo: user.mobileNo,
    gender: user.gender,
  };

  return jwt.sign(data, process.env.JWT_SECRET_KEY, {});
};

export const verify = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ auth: "Failed. No or Invalid Token" });
  }

  token = token.slice(7, token.length);

  jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decodedToken) {
    if (err) {
      return res.status(403).send({
        auth: `Failed`,
        message: err.message,
      });
    } else {
      req.user = decodedToken;
      console.log("✅ Token verified. User:", req.user);
      next();
    }
  });
};
