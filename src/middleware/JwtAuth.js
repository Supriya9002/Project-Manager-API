import jwt from "jsonwebtoken";
import UserModel from "../features/user/User.model.js";
import ApplicationError from "../utils/ApplicationError.js";

const jwtAuth =async (req, res, next) => {
  const token = req.headers["authorization"];
  
  if (!token) {
    return res.status(401).send("Unauthorized");
  }
  
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user =await UserModel.findOne({ _id: payload.userID, sessions: token });
    if (!user) {
      throw new ApplicationError("Unauthorized", 401);
    }
    req.userID = payload.userID;
    console.log(payload);
    console.log("A lo req.userID :", req.userID);
  } catch (err) {
    console.log(err);
    return res.status(401).send("Unauthorized");
  }
  next();
};

export default jwtAuth;
