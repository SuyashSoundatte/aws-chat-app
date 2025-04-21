import mongoose from "mongoose";
import { boolean, optional } from "zod";

const roomSchema = new mongoose.Schema({
  name:{
    type:String,
    required: true
  },
  isPrivate:{
    type: boolean,
    default: false,
  },
  password:{
    type: String,
    optional: true
  },
  participents:[
    {
      type: mongoose.Types.ObjectId,
      ref:"User"
    }
  ]
}, {timestamps: true});

const Room = mongoose.model("Room", roomSchema);
export default Room;