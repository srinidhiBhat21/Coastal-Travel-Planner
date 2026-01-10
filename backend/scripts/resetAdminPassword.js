const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

mongoose.connect(
  "mongodb+srv://coastaladmin:Coastal12345@cluster.qtustfh.mongodb.net/coastalDB"
);

async function resetAdminPassword() {
  const username = "admin";          // 🔴 DO NOT change unless needed
  const newPassword = "StrongAdmin@123";

  const admin = await Admin.findOne({ username });

  if (!admin) {
    console.log("❌ Admin user not found");
    mongoose.disconnect();
    return;
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  admin.password = hashedPassword;
  await admin.save();

  console.log("✅ Admin password updated successfully");
  mongoose.disconnect();
}

resetAdminPassword();
