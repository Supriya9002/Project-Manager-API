import QueryModel from "./query.model.js"

export default class QueryController{
    async storeQuery(req, res){
        try{
            const {name, email, message} = req.body;
            console.log(req.body); 
            const Query = new QueryModel({userID: req.userID, name, email, message});
            res.status(201).json({status: true, message: "Query Add Succesfull", data: Query });
        }catch(err){
            console.log(err);
            res.status(500).json({status: false, message: "Internal Server Error"});
        }
    }
}
