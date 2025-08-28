import mongoose from "mongoose";

const CustomerIdentitySchema = new mongoose.Schema(
  {
    identity_id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    unique_id_number: { type: String, ref: "Customer", required: true },
    date_of_birth: { type: Date, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email_address: { type: String, required: true },
    state: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("CustomerIdentity", CustomerIdentitySchema);
