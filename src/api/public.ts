import { Request, Response } from 'express';
import { Getalldoglist, dbGetdog, dbGetdogs } from '../db/db';

export const Alldoglist = async (req: Request, res: Response) => {
  res.json(await Getalldoglist())
};

export const Getdog = async (req: Request, res: Response) => {
  if(req.query.DogID){
    res.json(await dbGetdog(req.query.DogID.toString()))
  }else{
    res.json({ message: "Get Dog Error!" })
  }
};

export const Getdogs = async (req: Request, res: Response) => {

console.log(req.query.searchdata);
try {
  let SearchData=await JSON.parse(<string>req.query.searchdata);
  res.json(await dbGetdogs(SearchData));
} catch (error) {
  res.json({ message: "Get Dog Error!" })
}
};

export const dogman = async (req: Request, res: Response) => {
  res.send({ message: "doglist" })
};

