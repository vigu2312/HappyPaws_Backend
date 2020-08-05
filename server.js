
/************
 * Author: Moni Shah 
 **********/

const http = require("http");
const app = require("./app.js");


//creating a server using http module
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

server.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`));