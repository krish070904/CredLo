import mongoose from "mongoose";
const enquirySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bankName: { type: String, required: true },
    loanType: { type: String, default: "Personal Loan" },
    amount: { type: Number },
    interestRate: { type: String },
    status: {
      type: String,
      enum: ["Pending", "Contacted", "Approved", "Rejected"],
      default: "Pending",
    },
    contactMethod: {
      type: String,
      enum: ["Callback", "Email"],
      default: "Callback",
    },
  },
  { timestamps: true },
);
const Enquiry = mongoose.model("Enquiry", enquirySchema);
export default Enquiry;
