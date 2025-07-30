import { model, Schema } from "mongoose";
import { ERole, TUser } from "./user.interfaces";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: Object.values(ERole), default: ERole.RIDER },
    password: { type: String, required: true },
    profileImage: { type: String, required: true },
    phone: { type: String, required: true },
    isBlocked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.BCRYPT_SALT));
  next();
});

userSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});

export const User = model<TUser>("User", userSchema);
