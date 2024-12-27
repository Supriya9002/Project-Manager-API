import UserController from "./User.Controller.js";
import express from "express";
import jwtAuth from "../../middleware/JwtAuth.js";

//router
const userRoute = express.Router();

//instance
const userController = new UserController();

//routes
//singup
userRoute.post("/signup", (req, res)=>{
    userController.signup(req, res);
})
//login
userRoute.post("/login", (req, res)=>{
    // console.log("Su")
    userController.login(req, res);
})
//logOut
userRoute.get("/logOut",jwtAuth, (req, res)=>{
    userController.logOut(req, res);
})
//All LogOut
userRoute.get("/AllLogOut",jwtAuth, (req, res)=>{  
    // console.log("TTT");
    userController.allLogOut(req, res); 
})

export default userRoute;