import ProjectController from "./Project.controller.js";
import express from "express";
import jwtAuth from "../../middleware/JwtAuth.js";

//router
const projectRoute = express.Router();

//instance
const projectController = new ProjectController();

//routes
//Create Project
projectRoute.post("/createProject", jwtAuth, (req, res)=>{
    projectController.createProject(req, res);
})
//Get All Project
projectRoute.get("/getAllProject",jwtAuth, (req, res)=>{
    projectController.getAllProject(req, res);
})
//Get Project By ID
projectRoute.get("/getProjectByID/:ProjectID",jwtAuth, (req, res)=>{
    projectController.getProjectByID(req, res); 
})

export default projectRoute;