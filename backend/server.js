const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");

require("dotenv").config();

const app=express();
const port=process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json()); // allows us to parse json

//Mongo db connection
const uri=process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
});
const connection=mongoose.connection;
connection.once("open",()=>{
    console.log("MongoDB Database connection established successfully");
});

//API Routes
const userRouter=require("./routes/users");
const exerciseRouter=require("./routes/exercises");

app.use("/exercises",exerciseRouter);
app.use("/users",userRouter);

// this starts listening to the server
app.listen(port,()=>{
    console.log(`Server is running on port:${port}`);
});
