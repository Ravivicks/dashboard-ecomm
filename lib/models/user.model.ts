import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  Name: string;
  Age: number;
  City: string;
}

export const userSchema = new Schema<IUser>({
  Name: { type: String, required: true },
  Age: { type: Number, required: true },
  City: { type: String, required: true },
});

// Debugging output
console.log("Mongoose models before:", mongoose.models);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

// Debugging output
console.log("Mongoose models after:", mongoose.models);

export default User;
