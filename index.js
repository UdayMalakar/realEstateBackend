const express=require("express");
const app=express();
const {dbConnect} = require("./config/database");
const userRoutes =require("./routes/userRoutes");
const cookieParser=require("cookie-parser");
const cors=require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 8000;
app.use(cors({
    origin:'*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,  // Enable CORS with credentials (cookies, authorization headers)
  }));  
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
dbConnect();
app.use("/api/v1",userRoutes);

app.get("/",(req,res)=>{
    res.send("This is Estate Backend")
})
app.listen(PORT,()=>{
    console.log("Server Is Started At PORT :",PORT)
})
