import mongoose, { Document } from "mongoose";

interface IUser extends Document{
  username: string,
  email: string,
  password: string,
  isGuest: boolean,
  sessionExpiresAt: Date | null
}

const userSchema = new mongoose.Schema<IUser>({
  username:{
    type: String,
    required: true,
    unique: true
  },
  email:{
    type: String,
    unique:true,
    default: null
  },
  password:{
    type: String,
    default: null
  },
  isGuest:{
    type: Boolean,
    default: false
  },
  sessionExpiresAt: {
    type: Date,
    immutable: true
  }
}, {timestamps: true});

userSchema.index({ sessionExpiresAt: 1 }, { expireAfterSeconds: 86400 });

const User = mongoose.model("User", userSchema);

export default User;