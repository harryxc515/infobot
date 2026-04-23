const mongoose = require("mongoose");
const crypto = require("crypto");

const pasteSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    createdBy: { type: Number, required: true },
    views: { type: Number, default: 0 },
    expiresAt: { type: Date, default: null },
  },
  { timestamps: true }
);

pasteSchema.statics.createPaste = async function (content, userId) {
  const code = crypto.randomBytes(4).toString("hex");
  return this.create({ code, content, createdBy: userId });
};

module.exports = mongoose.model("Paste", pasteSchema);
