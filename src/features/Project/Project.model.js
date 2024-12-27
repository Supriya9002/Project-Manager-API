import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    name:{
        type: String,
        required: true, 
    },
    description:{
        type: String,
        required: true,
        minLength: [20, "The name should be at least 20 characters long"], 
    },
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    }
})

//model
const ProjectModel = mongoose.model("Project", projectSchema)
export default ProjectModel;