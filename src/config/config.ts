import dotenv from "dotenv";
dotenv.config();  

if (!process.env.JWT_SEC) {
  throw new Error("Missing JWT_SEC in .env file");
}

if(!process.env.PRODUCTION){
  throw new Error("Missing PRODUCTION in .env file");
}

const JWT_SEC = process.env.JWT_SEC as string;
const PRODUCTION = process.env.PRODUCTION as string;

export { JWT_SEC, PRODUCTION };