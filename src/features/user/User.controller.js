import UserModel from "./User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class UserController {
  async signup(req, res) {
    try {
      // console.log(req.body);
      const { name, email, password } = req.body;
      const hashPassword = await bcrypt.hash(password, 12);
      // console.log("Suu", hashPassword);
      const newUser = new UserModel({ name, email, password: hashPassword });
      await newUser.save();
      res.status(201).json({status: true, message: "SingUp Succesfull", data: newUser });
    } catch (err) {
      res.status(500).json({status: false, message: "Internal Server Error"});
      console.log(err);
    }
  }
  async login(req, res) {
    try {
      console.log(req.body);
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email: email });
      if (!user) {
        res.status(401).json({status: false, message: "Email does not exist" });
      }
      const userPassword = await bcrypt.compare(password, user.password);
      if (userPassword) {
        const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        // console.log("token", token);
        user.sessions.push(token);
        await user.save();
        // res.status(200).json({message: "User Login Succesfully", token: token})
        res.status(200).json({status: true, message: "Token Created", data: token });
      } else {
        res.status(401).json({status: false, message: "You Send Wrong Password" });
      }
    } catch (err) {
      res.status(500).json({status: false, message: "Internal Server Error"});
      console.log(err);
    }
  }

  async logOut(req, res) {
    try {
      const token = req.headers["authorization"];
  
      if (!token) {
        return res.status(401).json({status: false, message: "Authorization token required" });
      }
  
      // Verify and decode the token to get userID
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded) {
        return res.status(401).json({status: false, message: "Invalid token" });
      }
  
      // Extract the userID from the decoded token
      const userID = decoded.userID;
  
      // Pull the token from the sessions array of the user with the decoded userID
      const result = await UserModel.findByIdAndUpdate(userID, {
        $pull: { sessions: token },
      });
  
      if (!result) {
        return res.status(404).json({status: false, message: "User not found" });
      }
  
      res.status(200).json({status: true, message: "Account Logout Successful" });
    } catch (err) {
      res.status(500).json({status: false, message: "Internal Server Error" });
      console.log(err);
    }
  }

  async allLogOut(req, res) {
    try {
      console.log(req.userID)
      const result = await UserModel.findByIdAndUpdate(req.userID, {
        $set: { sessions: [] },
      });
      if (!result) {
        return res.status(404).json({status: false, message: "User not found" });
      }
      res.status(200).json({status: true, message: "All Account LogOut Succesfull" });
    } catch (err) {
      console.log(err);
      res.status(500).json({status: false, message: "Internal Server Error"});  
    }
  }
}
