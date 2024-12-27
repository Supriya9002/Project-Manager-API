import jwtAuth from "../../middleware/JwtAuth.js";
import QueryController from "./query.controller.js";
import express from "express"


const QueryRouter = express.Router();
const queryController = new QueryController();

QueryRouter.post("/storeQuery", jwtAuth, (req, res)=>{
    // console.log("Dada")
    queryController.storeQuery(req, res);
})

export default QueryRouter;