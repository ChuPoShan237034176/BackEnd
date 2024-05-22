
import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";


import  {Alldoglist, Getdog, Getdogs}  from "./api/public";
import  {Regstaff, Stafflogin, Adddog, Deldog, Editdog}  from "./api/staff";
import {IsValidToken} from './auth/auth'



import "reflect-metadata";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));


const PORT =  process.env.SERVER_PORT;
app.get("/public/doglist/all", Alldoglist);
app.get("/public/doglist/getdog", Getdog);
app.get("/public/doglist/getdogs", Getdogs);

app.post("/authorize/adddog", IsValidToken,Adddog);
app.post("/authorize/deldog", IsValidToken,Deldog);
app.post("/authorize/editdog", IsValidToken,Editdog);
//app.get("/staff/staffAuth", staffAuth);
app.post("/staff/Stafflogin", Stafflogin);
app.post("/staff/regstaff", Regstaff)

//app.use("/api", movieRouter);


app.get("*", (req: Request, res: Response) => {
  res.status(505).json({ message: "Bad Request" });
});

app.listen(1337,'0.0.0.0', () => {
  console.log('Server is running on port ' + PORT);
})