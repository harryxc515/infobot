const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn("[db] MONGODB_URI not set, skipping database connection");
    return;
  }
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("[db] connected to mongodb");
  } catch (err) {
    console.error("[db] connection failed:", err.message);
    process.exit(1);
  }
}

module.exports = { connectDB };
