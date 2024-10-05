const mongoose = require("mongoose");
const User = require("./User");

const tokenSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 24 * 3600 },
});

export default mongoose.model("Token", userSchema);
