import "./env.js";
import express from "express";
import ConnectUsingMongoose from "./src/config/db.js";
import userRoute from "./src/features/user/User.routes.js"
import projectRoute from "./src/features/Project/Project.routes.js";
import QueryRouter from "./src/features/queries/query.routes.js";
import loggerMiddleware from "./src/middleware/logger.middleware.js";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
 
//Server
const server = express();

// All Middleware
// Parse JSON request bodies
server.use(express.json());
server.use(loggerMiddleware);

// Swagger setup
const swaggerDocument = JSON.parse(
  fs.readFileSync(path.resolve("./Swagger.json"), "utf-8")
);
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// For all requests related to App
server.use("/api/users", userRoute);
server.use("/api/project", projectRoute);
server.use("/api/query", QueryRouter);

// Main API
server.get("/", (req, res) => {
  res.send("Welcome To ProjectManagerAPI App"); 
});

// Application Error Handler
server.use((err, req, res, next) => {
  if (err instanceof ApplicationError) {
    res.status(err.statusCode).send(err.message);
  } 
  res.status(500).send("server error! Try later!!");
  next();
});

const Port = process.env.Port || 3000;
console.log(Port)
// Port
server.listen(Port, () => {
  ConnectUsingMongoose();
  console.log(`Server Listen Port ${Port}`);
});
