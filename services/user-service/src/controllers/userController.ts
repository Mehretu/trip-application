import { NextFunction, Request, Response } from "express";
import { registerSchema } from "../validators/userValidator";
import createError from 'http-errors'
import User from "../models/User";

export const register = async (req: Request, res:Response, next:NextFunction){
    try{
        const { error } = registerSchema.validate(req.body);
        if (error) throw createError.BadRequest(error.details[0].message);

        const doesExist = await User.findOne({ email: req.body.email});
        if(doesExist) throw createError.Conflict(`${req.body.email} is already registered`);

        const user = new User(req.body);
        const savedUser = await user.save();
        
    }
}