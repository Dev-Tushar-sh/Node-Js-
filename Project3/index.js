const express = require("express");
const nodemon = require("nodemon");

const userRouter = require("./routes/user");
const {connectMongoDb} = require("./connection");

const app = express();
const PORT = 4000;

//Connect the Database
connectMongoDb("mongodb://127.0.0.1:27017/FirstDB")
.then(() => console.log("MongoDb Connected "));

//Middleware and Headers
app.use(express.urlencoded({ extended:false }));
// app.use(logReqRes("log.txt"));

app.use("/users",userRouter);

app.listen(PORT,()=>console.log(`Project3 server started at port=${PORT}`));
