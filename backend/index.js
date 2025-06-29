import express from "express"
import userRoute from "./routes/user.js"
import cors from 'cors'
import 'dotenv/config' 
import mongoConnect from "./db.js";
import profileRoute from "./routes/profile.js"

const app= express();
const PORT= process.env.PORT || 5000;


app.use(cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"],
  }));

app.use(express.urlencoded({ extended: false}));
app.use(express.json());



app.use("/api/user",userRoute)
app.use("/profile",profileRoute)

mongoConnect(process.env.MONGO_URL)



app.listen(PORT,()=> console.log(`Server started at ${PORT}`))