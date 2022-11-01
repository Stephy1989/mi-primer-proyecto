import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const userSchema = new Schema({
     name: {type: String, required: true},
     lastName: {type: String, required: true},
     email: {type: String, required: true, lowercase: true, trim: true, unique: true},
     password: {type: String, required: true},
     validEmail: {type: Boolean, default: false}

},
{timestamps: true}
);
const User = model("User", userSchema);

export default User

