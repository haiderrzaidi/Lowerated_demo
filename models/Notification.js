const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Notification schema
const notificationSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      trim: true, // Trim whitespace from the type field
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Notification", notificationSchema);
