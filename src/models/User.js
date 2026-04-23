const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userId: { type: Number, required: true, unique: true },
    username: { type: String, default: null },
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    isPremium: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    joinedAt: { type: Date, default: Date.now },
    lastSeen: { type: Date, default: Date.now },
    totalCommands: { type: Number, default: 0 },
  },
  { timestamps: true }
);

userSchema.statics.upsertUser = async function (ctx) {
  const from = ctx.from;
  return this.findOneAndUpdate(
    { userId: from.id },
    {
      username: from.username || null,
      firstName: from.first_name || "",
      lastName: from.last_name || "",
      lastSeen: new Date(),
      $inc: { totalCommands: 1 },
    },
    { upsert: true, new: true }
  );
};

module.exports = mongoose.model("User", userSchema);
