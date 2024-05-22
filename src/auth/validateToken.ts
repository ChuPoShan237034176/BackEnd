import {Request, Response, NextFunction}from 'express';
import jwt from 'jsonwebtoken';

interface IPayload {
        _id: string;
        iat: number;
        exp: number;
}

// Middleware function
export const TokenValidation = ( req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json('Access denied');
    const payload = jwt.verify(token, process.env.TOKEN_SECRET || 'token_secret') as IPayload;
    console.log(payload);

    next();
}