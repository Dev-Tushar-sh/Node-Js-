const express = require("express");
const mongoose = require("mongoose");
const nodemon = require("nodemon");

const app = express();
const PORT = 4000;

//Connection
mongoose
    .connect("mongodb://127.0.0.1:27017/FirstDB")
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log("Mongo Error",err));

//Schema
const userSchema = new mongoose.Schema({
    firstname : {type:String,required:true},
    lastname : {type:String,required:false},
    email : {type:String,required:true,unique:true},
    cityname : {type:String,required:true},
    gender : {type:String,required:true},
},
{ timestamps: true }
);

//Model
const User = mongoose.model("user",userSchema);

//Middleware and Headers
app.use(express.urlencoded({ extended:false }));

//Routes
app.get("/",homepage);
app.get("/users",returnhtml);
app.get("/api/users",returnjson);
app.post("/api/users",createuser);

app
 .route("/api/users/:id")
 .get(particular_user)
 .patch(updateuser)
 .delete(deleteuser)

//Routes Functions
function homepage(req,res)
{
    return res.send("Homepage");
}

async function returnhtml(req,res)
{
    const allDBusers = await User.find({}); //empty means all the users
    const html = `<ul> ${allDBusers.map((user) => `<li>${user.firstname} - ${user.email}</li>`).join("")} </ul>`;
    return res.send(html);
}

async function returnjson(req,res)
{
    const allDBusers = await User.find({});
    return res.json(allDBusers);
}

async function particular_user(req,res)
{
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({error:"User Not Found"});
    return res.json(user);
}

async function createuser(req,res)
{
    const body = req.query;
    if(!body || !body.firstname || !body.lastname || !body.email || !body.cityname || !body.gender)
    {
        return res.status(400).json({msg:"All Fields are Required"});
    };

    const result = await User.create(
        {
            firstname: body.firstname,
            lastname: body.lastname,
            email:body.email,
            gender:body.gender,
            cityname:body.cityname
        }
    );
    // console.log(result); 
    return res.status(201).json({ msg:"Success"});

}

async function updateuser(req,res)
{
    await User.findByIdAndUpdate(req.params.id, { lastname: "Tiwari" });
    return res.json({status:"Successfully Updated"});
}

async function deleteuser(req,res)
{
    await User.findByIdAndDelete(req.params.id);
    return res.json({status:"Successfully Deleted"});
}

app.listen(PORT,()=>console.log(`Project2 server started at port=${PORT}`));
