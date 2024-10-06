import mongoose, { Schema, model } from "mongoose";

export interface UserDocument extends Document {
  _id: string;
  email: string;
  password?: string;
  name: string;
  phone?: string;
  image?: string;
  palettes: mongoose.Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<UserDocument>({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Email is invalid",
    ],
  },
  password: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  phone: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  palettes: [{ type: Schema.Types.ObjectId, ref: 'Palette' }]
}, {
  timestamps: true,
});

const User = mongoose.models?.User || model<UserDocument>('User', UserSchema);
export default User;