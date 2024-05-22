import {Request, Response, NextFunction}from 'express';
import jwt from 'jsonwebtoken';

import {dbChackstafflogin} from '../db/db';

export interface staffPayload {
  _id?: any
  name: string
  password: string
  email: string
  regcode: string
}

export const CreateAuthToken = (payload :staffPayload, expTime :string) => {
    
    const exp={ expiresIn: expTime };
    // Token
    return jwt.sign(payload, process.env.TOKEN_SECRET || 'token_secret', exp);
};

export const IsValidToken =async ( req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json('Access denied');
    
    const payload = <jwt.JwtPayload>jwt.verify(token, process.env.TOKEN_SECRET || 'token_secret');
    
    if (Date.now() >= ((payload.exp ?? 0) * 1000)) return res.status(401).json('Token expired');
    
    const staff = await dbChackstafflogin(payload.email ,payload.password);
    if (staff.length==0) return res.status(401).json('User Error Access denied');
    console.log("jwt Chack",payload);
    
    next();
};