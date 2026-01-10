const Plan = require("../models/Plan");

// ADD PLAN (FINAL FIXED VERSION)
exports.addPlan = async (req, res) => {
  try {
    const { title, duration, budget } = req.body;

    // 🔹 Parse days correctly (multipart/form-data)
    let days = [];
    if (req.body.days) {
      days = JSON.parse(req.body.days);
    }

    // 🔹 Basic validation
    if (!title || !duration || !budget) {
      return res.status(400).json({ message: "Plan details missing" });
    }

    if (!Array.isArray(days) || days.length === 0) {
      return res
        .status(400)
        .json({ message: "Please add at least one day with places" });
    }

    // 🔹 Attach uploaded image URLs to places
    if (req.files && req.files.length > 0) {
      let fileIndex = 0;

      days.forEach((day) => {
        day.places.forEach((place) => {
          if (req.files[fileIndex]) {
            place.image = `http://localhost:5000/uploads/${req.files[fileIndex].filename}`;
            fileIndex++;
          }
        });
      });
    }

    // 🔹 Validate days & places
    for (const day of days) {
      if (!day.places || day.places.length === 0) {
        return res
          .status(400)
          .json({ message: `Each day must have at least one place` });
      }

      for (const place of day.places) {
        if (
          !place.name ||
          !place.description ||
          !place.image ||
          !place.mapQuery
        ) {
          return res.status(400).json({
            message: "All place fields are required",
          });
        }
      }
    }

    // 🔹 Save plan ONCE
    const plan = new Plan({ title, duration, budget, days });
    await plan.save();

    res.status(201).json(plan);
  } catch (error) {
    console.error("ADD PLAN ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET all plans
exports.getPlans = async (req, res) => {
  try {
    const plans = await Plan.find().sort({ createdAt: -1 });
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch plans" });
  }
};

// GET single plan
exports.getPlanById = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    res.json(plan);
  } catch (err) {
    res.status(404).json({ message: "Plan not found" });
  }
};

// DELETE plan
exports.deletePlan = async (req, res) => {
  try {
    await Plan.findByIdAndDelete(req.params.id);
    res.json({ message: "Plan deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};
