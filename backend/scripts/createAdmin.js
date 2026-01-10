const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

mongoose.connect("mongodb+srv://coastaladmin:Coastal12345@coastalcluster.qtustfh.mongodb.net/?appName=coastalCluster");

async function createAdmin() {
  const username = "admin";
  const password = "Admin@123";

  const hashedPassword = await bcrypt.hash(password, 10);

  await Admin.create({
    username,
    password: hashedPassword,
  });

  console.log("Admin created successfully");
  mongoose.disconnect();
}

createAdmin();
