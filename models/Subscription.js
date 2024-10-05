const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    paymentMethod: {
      type: String,
      trim: true,
    },
    tools: [
      {
        toolName: { type: String, trim: true },
        toolId: { type: mongoose.Schema.Types.ObjectId, ref: "Tool" },
        selected: { type: Boolean, default: false },
      },
    ],
    transactionHistory: [
      {
        date: { type: Date, default: Date.now },
        amount: { type: Number },
        currency: { type: String, default: "USD" },
        status: { type: String, trim: true },
        transactionId: { type: String, trim: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);

const toolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Tool = mongoose.model("Tool", toolSchema);

export { Subscription, Tool };
