import mongoose from "mongoose";

const PriceTrackerSchema = new mongoose.Schema({
  url: { type: String, required: true },
  targetPrice: { type: Number, required: true },
  currentPrice: { type: Number, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.PriceTracker ||
  mongoose.model("PriceTracker", PriceTrackerSchema);
