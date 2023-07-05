import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const auth = asyncHandler(async (req, res, next) => {
    const token = req.header("auth-token");
    if (!token){
        res.status(401);
        throw new Error("User is not Authorized or Token is missing ");
    }
    jwt.verify(token, process.env.ACCESSTOKENSECRET, (err, decoded) => {
        if (err){
            res.status(401);
            throw new Error("User is not Authorized");
        }
        req.user = decoded.user;
        next();
    });
});