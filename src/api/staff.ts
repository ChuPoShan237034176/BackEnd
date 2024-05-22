import { Request, Response } from 'express';
import {staffPayload, CreateAuthToken} from '../auth/auth'
import { dbInsertStaff, dbFindStaff, dbChackstafflogin, dbInsertDog, dbDelDog, dbEditDog } from '../db/db';

export const Regstaff = async (req: Request, res: Response) => {
  
    const newStaff:staffPayload = {  name: req.body.data.Name,
                        password: req.body.data.Pass,
                        email: req.body.data.Email,
                        regcode: req.body.data.SignupCode }
  

  const staff = await dbFindStaff(newStaff.email)

  if ((staff === "[]" || staff === undefined || staff.length == 0) && newStaff.email!="" && newStaff.name!=""&& newStaff.password!="" && newStaff.regcode===process.env.REGCODE) {
    
    await dbInsertStaff(newStaff);
    res.json({ regstate: "ok" , auth_token: CreateAuthToken(newStaff,'1d') });

  }else{
    res.json({ regstate: "error" });
  }

};

export const Stafflogin = async (req: Request, res: Response) => {
    
  
    const staff = await dbChackstafflogin(req.body.data.Email ,req.body.data.Pass);
    
    console.log(staff)

    if (staff.length>0){
        res.json({ login: "ok" , Name: staff[0].name, auth_token: CreateAuthToken(staff[0],'1d') });
    }else{
        res.json({ login: "error" });
    }
    
};

export const Adddog = async (req: Request, res: Response) => {
  
  const NewDog = {  name: req.body.data.name,
                    age: req.body.data.age,
                    breeds: req.body.data.breeds,
                    info: req.body.data.info,
                    Pic: req.body.data.pic }
 
  //console.log(NewDog)

  await dbInsertDog(NewDog);

  res.json({ AddDog: "ok"});  
};

export const Editdog = async (req: Request, res: Response) => {
  //console.log(req.body)
  let EditDog:any=null;

  if(req.body.data.pic===''){
    EditDog = {  $set:{"name": req.body.data.name,
                    "age": req.body.data.age,
                    "breeds": req.body.data.breeds,
                    "info": req.body.data.info}
                    }

  }else{
    EditDog = {  $set:{"name": req.body.data.name,
                    "age": req.body.data.age,
                    "breeds": req.body.data.breeds,
                    "info": req.body.data.info,
                    "Pic": req.body.data.pic} }
  }
  //console.log(req.body.data.dogid)

  await dbEditDog(req.body.data.dogid,EditDog);

  res.json({ EditDog: "ok"});  
};

export const Deldog = async (req: Request, res: Response) => {
  //console.log(req.body.dogid)
  await dbDelDog(req.body.dogid);
  res.json({ DelDog: "ok"});  
};

