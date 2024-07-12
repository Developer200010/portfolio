const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const flash = require("connect-flash");
const expressSession = require("express-session");
require("dotenv").config();

app.use(express.static(__dirname))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(flash())
app.use(expressSession({
    secret:"codingcosidngcoasfaf",
    saveUninitialized:true,
    resave:true
}));
mongoose.connect(process.env.MOGNO_URL).then(()=> console.log("db is connected successfully")).catch((error)=> console.log(error));

const userSchema = mongoose.Schema({
    username:String,
    email: String,
    phone:String,
    subject: String,
    details: String
})

const User = mongoose.model("user", userSchema);

console.log(process.env.MOGNO_URL)

app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"))
})

app.post("/user", async (req,res)=>{
    try {
        let{username,email,phone,subject,details}= req.body;
        const user = await User.create({
            username,
            email,
            phone,
            subject,
            details
        });
            res.redirect("/")
    } catch (error) {
        console.log(error)
    }
  
})

app.get("/message",(req,res)=>{
    res.send("done")
    const message = req.flash("success")
    console.log(message)
})


app.listen(3000, ()=>{
    console.log("server is running well")
})