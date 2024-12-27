import mongoose from "mongoose";

const QuerySchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    name:{
        type: String,
        required: true, 
    },
    email:{
        type:String,
        required: [true, "email is required"],
        match: [/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/],
    },
    message:{
        type: String,
        required: true,
    }
})

//model
const QueryModel = mongoose.model("Query", QuerySchema);
export default QueryModel;