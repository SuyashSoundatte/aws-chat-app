import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import ApiError from "../utils/ApiError";
import User from "../models/User.models";
import ApiResponse from "../utils/ApiResponse";
import { hashPass, verifyPass } from "../utils/hashPass";
import jwt from "jsonwebtoken";
import nameGenerate from "../utils/GenarateUsername";
import { JWT_SEC, PRODUCTION } from "../config/config";

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const {email, password } = req.body;

  if (typeof email !== 'string' || typeof password !== 'string') {
    throw new ApiError(400, "All user fields must be strings");
  }

  if ( !email || !password) {
    throw new ApiError(401, "All field are required...");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(402, "User Not Found! Pl Register...");
  }


  const verifyPassword:boolean = await verifyPass(user.password, password)
  if(!verifyPassword){
    throw new ApiError(401, "Password is incorrect.. Pl try again...");
  }

  const token = jwt.sign(
    {email: user.email},
    JWT_SEC,
    { expiresIn: "24h"}
  )

  res.cookie("cookie", token, {
    httpOnly: true,
    secure: PRODUCTION === "production",
    maxAge: 24*60*60*1000,
  })

  return res.send(new ApiResponse(200, {user, token}, "User Created Successfully!"));
});


const registerUser = asyncHandler(async(req:Request, res:Response)=>{
  const { username, email, password } = req.body;
  
  if (typeof username !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
    throw new ApiError(400, "All user fields must be strings");
  }

  if( !username || !email || !password ){
    throw new ApiError(400, "All user fields required");
  }

  const userExisted = await User.findOne({email})
  if(userExisted){
    throw new ApiError(400, "User already exist with this email!");
  }

  const hashPassword:string = await hashPass(password);
  
  const user = await User.create({
    username: username,
    email: email,
    password: hashPassword
  })

  return res.send(new ApiResponse(201, user, "User registered successfully"));
})

const guestLogin = asyncHandler(async(req:Request, res:Response)=>{
  const username = nameGenerate();
  const userFound = await User.findOne({ username });

  if(userFound){
    throw new ApiError(400, "Username already exists...");
  }

  const sessionExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const user = await User.create({
    username: username,
    isGuest: true,
    sessionExpiresAt: sessionExpiresAt
  });

  const token = jwt.sign(
    { username },
    JWT_SEC,
    { expiresIn: "24h" }
  );

  res.send(new ApiResponse(201, {user, token}, "Guest login successfully!"));
})

export {
  loginUser,
  registerUser,
  guestLogin
}