const express = require("express");
const router = express.Router();

const {
  addEnquiry,
  getEnquiries,
  deleteEnquiry,
} = require("../controllers/enquiryController");

router.post("/", addEnquiry);
router.get("/", getEnquiries);
router.delete("/:id", deleteEnquiry);

module.exports = router;
