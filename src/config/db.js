import "./../../env.js"
import mongoose from "mongoose";

const ConnectUsingMongoose = async ()=>{
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("MongoDB Connect Using Mongoose")
    }catch(err){
        console.log(err)
        console.log("Error While Mongoose Connected") 
    }
}
export default ConnectUsingMongoose;