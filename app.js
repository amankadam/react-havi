const express=require('express');
const app=express();
const cookieParser= require('cookie-parser');
const mongoose = require('mongoose');
var cors=require('cors');

const path = require("path")

app.use(express.static(path.join(__dirname, "client", "build")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


app.use(cors());
require("dotenv").config();

app.use(cookieParser());
app.use(express.json());


mongoose.connect('mongodb+srv://upi:XSs3K5yXOwb5I2AL@cluster0.odlmg.mongodb.net/upiDatabse?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology: true,useFindAndModify:false });

const port = process.env.PORT || 3001;
const userRouter=require('./routes/User');
app.use('/user',userRouter);
app.listen(port,()=>{
  console.log('server started..');
});
