import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  snederId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  receiverId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  message:{
    type:String,
    required: true
  },
  roomId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room"
  }
}, {timestamps: true});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;