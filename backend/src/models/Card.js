import mongoose from "mongoose";
const cardSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    bank: { type: String, required: true },
    type: { type: String, enum: ["Credit", "Debit"], default: "Credit" },
    tagline: { type: String, required: true },
    benefits: [{ type: String }],
    joiningFee: { type: Number, required: true },
    annualFee: { type: Number, required: true },
    logoUrl: { type: String },
    rating: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);
const Card = mongoose.model("Card", cardSchema);
export default Card;
