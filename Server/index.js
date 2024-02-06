const http = require("http");
const fs = require("fs");
const url = require("url");

// we have to pass the reference in the patameter not have to invoke them right after creating the route
function handeler_function(req,res)
{
    if(req.url === "/favicon.ico")
    {
        return res.end();
    }
    const myurl = url.parse(req.url,true);
    console.log(myurl);
    console.log("New req Recieved");
    const log = `${ Date.now() }: ${ req.method } ${ req.url } New req Recieved \n`;
    fs.appendFile("Request_Log.txt",log,(err,data)=>
    {
        switch(myurl.pathname)
        {
            case '/': res.end("Home Page");
                    break;

            case '/about': res.end(`My name is ${ myurl.query.name } and i am the one who knocks`);
                    break;

            case '/contact':
                    if(req.method === "GET")
                    {
                        // write the DB query to read the field
                        res.end("You make a get request we are accessing the database");
                    }
                    else if(req.method === "POST")
                    { res.end("success");}
                    break;

            case '/support': res.end("support");
                    break;

            default: res.end("404 Not Found");
        }
    });
}

const myserver = http.createServer(Handeler_function);
myserver.listen(8000,() => console.log("Server Started!!!!"));
