const http= require('http');
const app= require('./app')
const port= 4002
const {initializeSocket}= require('./socket/socket.io');

const server= http.createServer(app);


initializeSocket(server);
server.listen(port, ()=>{

    console.log(`server is running on port : ${port}`)
});