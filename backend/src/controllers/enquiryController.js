import Enquiry from "../models/Enquiry.js";
export const createEnquiry = async (req, res) => {
  try {
    const { bankName, loanType, amount, interestRate, contactMethod } =
      req.body;
    const enquiry = await Enquiry.create({
      user: req.user._id,
      bankName,
      loanType,
      amount,
      interestRate,
      contactMethod,
    });
    res.status(201).json(enquiry);
  } catch (error) {
    console.error("Enquiry Error:", error);
    res.status(500).json({ message: "Failed to submit enquiry" });
  }
};
export const getMyEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch enquiries" });
  }
};
