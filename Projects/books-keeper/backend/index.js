import express from "express";
import {port , mongoDBURL} from "./config.js";
import {Book} from "./models/bookmodel.js";
import mongoose from "mongoose";
import bookroutes from "./routes/bookroutes.js";
import cors from "cors";

const app = express();
 
// middleware for parsing body request

app.use(express.json()); 

// middleware for handling cors policy 
//allow all origin with defalut of cors(*);
app.use(cors());
//allow custom origins 
/*app.use(
    cors({
        origin : "http://localhost:3000",
        methods : ['GET' , 'POST', 'PUT' , 'DELETE'];
        allowedHeaders : [content-type];
    })
);*/


//fisrt get route to home page
app.get('/' , (request , response) =>{
    console.log(request);
    return response.status(234).send("welcome to MERN STACK application");
})

app.use("/books", bookroutes)

//connected to mongoose
mongoose.connect(mongoDBURL)
.then(() =>{
    console.log("connected to database successfully");
    app.listen(port , (request,response) => {
        console.log(`app is listening on port ${port}`);    //connect to express server only if database connection is successful
      });
    
})
.catch((error) =>{
    console.log(error);
})

