import dotenv from "dotenv";
import app from "./app";
import ConnectDB from "./utils/db"

dotenv.config();

function StartServer(){
  const port:number = Number(process.env.PORT)

  ConnectDB()
  .then(()=>{
    app.on("error", (err)=>{
      throw err;
    })

    app.listen(port, ()=>{
      console.log(`Connected to the Soul Society http://localhost:${port}`)
    })
  })
  .catch((err)=>{
    console.log("Error: ", err);
    process.exit(1);
  })
}


StartServer();