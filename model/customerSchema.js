import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
  {
    unique_id_number: { type: String, ref: "Customer", required: true },
    date_of_birth: { type: Date, required: true },
    email_address: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    id_type: {
      type: String,
      enum: ["Aadhar", "PAN"],
      required: true,
    },
    state: { type: String },

    customer_addressid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CustomerAddress",
    },
    sim_id: { type: mongoose.Schema.Types.ObjectId, ref: "SimDetails" },
  },
  { timestamps: true }
);

export default mongoose.model("Customer", CustomerSchema);
