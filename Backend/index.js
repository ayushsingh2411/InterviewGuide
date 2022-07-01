import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import { v4 } from "uuid"
import {Server} from 'socket.io'
import http from 'http'
import request from "request"
import {ExpressPeerServer} from 'peer'


//cofiguration
const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
const peerServer = ExpressPeerServer(server, {
    debug: true
});
app.use('/peerjs', peerServer); //this line is causing errors

//new code
// const peerServer = ExpressPeerServer(server, {
//     debug: true
// });

// app.use('/peerjs', peerServer);


// const io = new Server(server);
const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });
//creating database connection and creating a database for the project
//const dbURI = "mongodb+srv://mini_project:<password>@cluster0.rm5xu.mongodb.net/?retryWrites=true&w=majority";
const dbURI = "";
// mongoose.connect("mongodb://localhost:27017/miniProject", () => {
//     console.log("DB Connected!")
// })

mongoose.connect(dbURI, () => {
    console.log("DB Connected!")
})

//creating user schema, coz to create any model we first need to create schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

//creating model
const User = new mongoose.model("User", userSchema);

// app.get('/:room',(req,res) => {
//     res.render('room',{ roomId: req.params.room})
// })

//Routes
//Login API
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    User.findOne({email:email}, (err, user)=>{
        if(user){
            //check password
            if(user.password === password){
                res.send({message: "Login Successful", user: user})
            }
            else{
                res.send({message: "Password Incorrect!"});
            }
        }
        else{
            res.send({message: "User is NOT Registered."})
        }
    })
})

//Register API
app.post("/register", (req, res) => {
    //we have sent user object in body of request
    const { name, email, password } = req.body;

    User.findOne({ email: email }, (err, user) => {
        if (user) {
            res.send({ message: "User already Registered" });
        }
        else {
            //creating a mongoDB user
            const user = new User({
                name: name,
                email: email,
                password: password
            });

            //saving the user into database, here we are taking a callback function inside save(), in case any error occurs
            user.save(err => {
                if (err) {
                    res.send(err)
                }
                else {
                    res.send({ message: "Registered Successfully! Please Login Now." });
                }
            })
        }
    })

})

var iid;
//create-new-room api
app.post("/create-new-room", (req, res) => {
    const id= v4();
    iid= id;
    // res.send({message: "A room created with id: "+id, id});
    res.send(id);
})



//codeeditor code
app.post("/runCode", (req, res) => {
    if (req.body.language == "python") req.body.language = "python3";
    console.log(req.body)
    var program = {
        script : req.body.code,
        language: req.body.language,
        stdin: req.body.input,
        versionIndex: "0",
        clientId: '',
        clientSecret: ''
    };
    request({
        url: 'https://api.jdoodle.com/v1/execute',
       // url: 'https://api.hackerearth.com/v4/partner/code-evaluation/submissions/',
        method: "POST",
        json: program
    },
    function (error, response, body) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body);
        return res.status(201).send(body)
    });
});


//socket connection code
io.on("connection", (socket) => {
    console.log("User online");
    
    socket.on("join_room", (data)=>{
        socket.join(data);
        
    })
    // receive a message from the client
    socket.on('get-document', documentId=>{
        const data="";
        socket.join(documentId);
        socket.emit('load-document', data);

        socket.on('canvas-data', (data)=>{
            socket.broadcast.to(documentId).emit('canvas-data', data);
        });
    })

    socket.on("join-video-room", (roomId, userId)=>{
        socket.join(roomId);
        console.log("video room joined");

        socket.broadcast.to(roomId).emit('user-connected', userId);
    })

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("code", (data) => {
        socket.to(data.room).emit("receive_code", data.cod);
    });

    socket.on("input_code", (data) => {
        socket.to(data.room).emit("receive_input", data.cod);
    });

    socket.on("output_code", (data) => {
        socket.to(data.room).emit("receive_output", data.cod);
        console.log("Output data: "+data.cod);
    });

    // socket.on('join-room', (roomId, userId) => {
    //     console.log(socket);
    //     socket.join(roomId);
    //     socket.broadcast.to(roomId).emit('user-connected', userId);
    //   })
    
  });

server.listen(9002, () => {
    console.log("Backend Started at 9002");
})
