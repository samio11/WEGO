import { model, Schema } from "mongoose";
import { TAdmin } from "./admin.interface";
import { ERole } from "../user/user.interfaces";

const adminSchema = new Schema<TAdmin>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export const Admin = model<TAdmin>("Admin", adminSchema);
