import express from "express";
import mongoose from "mongoose";
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { News } from "./Schema.js";
dotenv.config()
const app = express();
app.use(express.json())
app.use(cors())
const port = process.env.port || 6000
const mongourl = process.env.mongoUrl
mongoose.connect(mongourl,{useNewUrlParser:true},(err)=>{!err?(console.log("Mongo Db connection successfull")):(console.log("Error connecting to database " + err.message))})
const __dirname = path.resolve();


app.get("/news", async(req, res) => {
  try {
    await News.find({}).then(data=>res.send(data))

  } catch (error) {
    res.send(error.message)
  }
});
app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
  (err) => {
    res.status(500).send(err);
  };
});
app.listen(port, () => {
  console.log(`server running at ${port}`);
});
