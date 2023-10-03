import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import getUserRouter from "./routes/userRoutes.js";
import getAuthRouter from "./routes/authRoutes.js";

const app = express();
const PORT = 8800;

//
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//routes
app.use("/users", getUserRouter);
app.use("/auth", getAuthRouter);

app.listen(PORT, ()=>{
    console.log(`conected in Node.js and PORT is ${PORT}`);
});