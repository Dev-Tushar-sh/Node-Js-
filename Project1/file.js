const fs = require("fs");
const os = require("os");


console.log(os.cpus().length);

// fs.writeFileSync("./test.txt","Hello there how are you");
fs.appendFileSync("./test.txt",(`${ new Date().getDate() } "Date" ${ Date.now() } " \n "`));
fs.appendFileSync("./test.txt",(`${ Date.now() } \n`));