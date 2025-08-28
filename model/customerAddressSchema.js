import mongoose from "mongoose";

const CustomerAddressSchema = new mongoose.Schema(
  {
    address_id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    state: { type: String, required: true },

    unique_id_number: { type: String, ref: "Customer", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("CustomerAddress", CustomerAddressSchema);
