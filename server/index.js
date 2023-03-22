import express, { Router } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./Routes/client.js";
import generalRoutes from "./Routes/general.js";
import managementRoutes from "./Routes/management.js";
import salesRoutes from "./Routes/sales.js";

// DATA IMPORTS
import User from "./models/User.js";
import {dataUser} from "./data/index.js";


/*CONFIGURATION*/
dotenv.config();
const  app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
/*ROUTES*/
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);


/*MONGOOSE SETUP*/
const PORT= process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    UseUnifiedTopology: true,

}).then(()=> {
    app.listen(PORT, ()=> console.log(`Server Port:${PORT}`))
    /* ONLY ADD DATA ONE TIME */
   // User.insertMany(dataUser);//
}).catch((error) => console.log(`${error} did not connect`));
