const Enquiry = require("../models/Enquiry");

// ADD enquiry
const addEnquiry = async (req, res) => {
  try {
    const enquiry = new Enquiry(req.body);
    await enquiry.save();
    res.status(201).json({ message: "Enquiry sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to save enquiry" });
  }
};

// GET enquiries
const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch enquiries" });
  }
};

// DELETE enquiry  ✅ THIS WAS MISSING / WRONG
const deleteEnquiry = async (req, res) => {
  try {
    await Enquiry.findByIdAndDelete(req.params.id);
    res.json({ message: "Enquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete enquiry" });
  }
};

module.exports = {
  addEnquiry,
  getEnquiries,
  deleteEnquiry,
};
