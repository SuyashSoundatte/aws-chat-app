import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    const url = process.env.MONGOD_URI;
    if(!url || typeof(url) !== 'string'){
      throw Error("url is undefined");
    }
    await mongoose.connect(url)
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.log("MongoDB connection failed!");
    process.exit(1);
  }
}

export default ConnectDB;