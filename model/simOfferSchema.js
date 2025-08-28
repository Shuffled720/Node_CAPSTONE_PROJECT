import mongoose from "mongoose";

const SimOfferSchema = new mongoose.Schema(
  {
    offer_id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    call_qty: { type: Number, default: 0 },
    cost: { type: Number, required: true },
    data_qty: { type: Number, default: 0 }, // in MB/GB
    duration: { type: Number, required: true }, // in days
    offer_name: { type: String, required: true },

    // Foreign key -> SimDetails
    sim_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SimDetails",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("SimOffer", SimOfferSchema);
