import ProjectModel from "./Project.model.js";

export default class ProjectController{
    //create Project
    async createProject(req, res) {
        try {
            // console.log(req.body);
            const { name, description, startDate, endDate } = req.body;
            // console.log("startDate", startDate, "endDate", endDate);
            // Format date  'YYYY-MM-DD' 
            const formattedStartDate = new Date(startDate).toISOString().split("T")[0];
            const formattedEndDate = new Date(endDate).toISOString().split("T")[0];
            // console.log("Formatted Start Date:", formattedStartDate, "Formatted End Date:", formattedEndDate);
            const project = new ProjectModel({
                userID: req.userID,
                name,
                description,
                startDate:formattedStartDate, 
                endDate:formattedEndDate,
            });

            await project.save();
            console.log(project);
            res.status(201).json({status: true, message: "Project Added", data: project });
        } catch (err) {
            console.log(err);
            res.status(500).json({status: false, message: "Internal Server Error" });
        }
    }

    async getAllProject(req, res) {
        try {
            let query = { userID: req.userID }; 
            //get data form query parameter
            const { startDate, endDate } = req.query;
    
            //! i Add startDate and endDate in query 
            // if startDate is given
            if (startDate) {
                query.startDate = { $gte: new Date(startDate).toISOString().split("T")[0] };
            }
            // if endDate is given,
            if (endDate) {
                query.endDate = { $lte: new Date(endDate).toISOString().split("T")[0] };
            }
            // console.log("query", query);
            const allProject = await ProjectModel.find(query);
            if (allProject.length === 0) {
                return res.status(200).json({status: false, message: "No Projects Found" });
            }
            // return projects
            return res.status(200).json({status: true, message: "Get all Projects", data: allProject });
        } catch (err) {
            console.log(err);
            res.status(500).json({status: false, message: "Internal Server Error" });
        }
    }
    

    async getProjectByID(req, res){
        try{
            const {ProjectID} = req.params;
            // console.log("ProjectID", ProjectID);
            const project = await ProjectModel.findOne({_id: ProjectID, userID: req.userID});
            if(!project){
                return res.status(404).json({status: false, message: "Project Not Found"})
            }
            return res.status(200).json({status: true ,message: "Get Project Succesfull", data: project});
        }catch(err){
            console.log(err);
            res.status(500).json({status: false, message: "Internal Server Error"});
        }
    }
}
