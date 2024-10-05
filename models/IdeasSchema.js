const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Message Schema
const messageSchema = new Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["sent", "delivered", "read"],
      default: "sent",
    },
  },
  { timestamps: true }
);

// Conversation Schema
const conversationSchema = new Schema(
  {
    participants: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        unreadCount: { type: Number, default: 0 },
      },
    ],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
    lastMessage: {
      senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      content: { type: String },
      timestamp: { type: Date },
    },
    isGroupChat: { type: Boolean, default: false },
    groupName: { type: String },
    groupAdmins: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isArchived: { type: Boolean, default: false },
    typing: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    type: {
      type: String,
      enum: ["primary", "general"],
      default: "primary",
    },
  },
  { timestamps: true }
);

module.exports = {
  Message: mongoose.model("Message", messageSchema),
  Conversation: mongoose.model("Conversation", conversationSchema),
};
