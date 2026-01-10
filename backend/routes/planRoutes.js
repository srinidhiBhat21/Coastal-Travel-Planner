const express = require("express");
const upload = require("../middleware/upload");
const router = express.Router();
const {
  getPlans,
  getPlanById,
  addPlan,
  deletePlan,
} = require("../controllers/planController");

router.get("/", getPlans);
router.get("/:id", getPlanById);
router.post("/", upload.any(), addPlan);
router.delete("/:id", deletePlan);

module.exports = router;
