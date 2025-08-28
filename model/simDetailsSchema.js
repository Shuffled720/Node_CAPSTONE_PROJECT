import mongoose from "mongoose";

const SimDetailsSchema = new mongoose.Schema(
  {
    sim_id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    service_number: { type: String, required: true, unique: true },
    sim_number: { type: String, required: true, unique: true },
    sim_status: {
      type: String,
      enum: ["active", "inactive", "blocked"],
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("SimDetails", SimDetailsSchema);
