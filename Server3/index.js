const express = require("express");
const users = require("./Database for Server3.json");
const fs = require("fs");

const app = express();
const PORT = 3000;

//middleware - Plugin just a plugin to set the req data in a body make an object of body this middleware run on every request
app.use(express.urlencoded({ extended:false }));//urlencoded MW is for post form data

app.use((req,res,next)=>{
    console.log("Hello from middleware 1");
    req.myusername = "Tushar Sharma";
    fs.appendFile('log.txt',`\n ${Date.now()}:${req.ip}: ${req.method}: ${req.path}\n`,(err,data) =>{
        next();
    });
});

app.use((req,res,next)=>{
    console.log("Hello from middleware 2",req.myusername);
    next();
    // return res.end("hey");
});


//Routes Functions
function returnhtml(req,res)
{
    // console.log(req);
    // if(req === "/api/users")
        // return res.json(users);
    // else if(req === "/users")
    // {
        const html = `<ul> ${users.map(user => `<li>${user.first_name}</li>`).join("")} </ul>`;
        return res.send(html);
    // }
}
function returnjson(req,res)
{
    return res.json(users);
}
function particular_user(req,res)
{
    const id = Number(req.params.id);
    const user = users.find( (user)=> user.id === id );
    return res.json(user);
}
function updateuser(req,res)
{
    //update the user with the given id 
}
function deleteuser(req,res)
{
    //delete the user with id 
}
function createuser(req,res)
{
    //create the user with the proper form data from the front end
    const body = req.body;
    console.log("Body",body);
    users.push( { body,id:users.length +1} );
    fs.writeFile("./Database for Server.json",JSON.stringify(users), (err,data)=>{
        return res.json({status : "Success",id: users.length });
    });
    
}

//Routes
app.get("/users",returnhtml);
app.get("/api/users",returnjson);
app
 .route("/api/users/:id")
 .get(particular_user)
 .patch(updateuser)
 .delete(deleteuser)

app.post("/api/users",createuser)

app.listen(PORT,()=>console.log(`Server3 Project server started at port=${PORT}`));

