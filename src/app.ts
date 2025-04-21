import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

// global middlewares
const allowedOrigins = ['http://localhost:5173'];

app.use(
  cors({
    origin: (origin: string | undefined, callback: (error: Error | null, allow: boolean) => void) => {
      if (allowedOrigins.includes(origin as string) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'), false);
      }
    },
    credentials: true,
  })
);

app.use(express.json())


// routes imports
import auth from "../src/routes/auth.routes"
import GlobalErrorHandler from "./utils/GlobalErrorHandler";


// routes declarations
app.use('/api/v1', auth)

app.use(GlobalErrorHandler);


// dafualt routes
app.get('/', (req:Request, res: Response)=>{
  res.send("Yare Yare.... watashi no server des!");
})

app.get('*', (req:Request, res:Response)=>{
  res.send("Page not found: You lost like Zoro");
})

export default app; 