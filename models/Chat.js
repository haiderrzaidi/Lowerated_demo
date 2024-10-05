import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
      ref: "Conversation",
      required: true,
    },
    senderId: {
      type: String,
      ref: "User",
      required: true,
    },
    senderType: {
      type: String,
      enum: ['user', 'bot'],
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

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        userId: {
          type: String,
          ref: "User",
          required: true,
        },
        unreadCount: { type: Number, default: 0 },
      },
    ],
    messages: [{ type: String, ref: "Message" }],
    lastMessage: {
      senderId: { type: String, ref: "User" },
      content: { type: String },
      timestamp: { type: Date },
    },
    isGroupChat: { type: Boolean, default: false },
    groupName: { type: String },
    groupAdmins: [{ type: String, ref: "User" }],
    isArchived: { type: Boolean, default: false },
    typing: [{ type: String, ref: "User" }],
    type: {
      type: String,
      enum: ["primary", "general"],
      default: "primary",
    },
  },
  { timestamps: true }
);

// Add indexes
messageSchema.index({ conversationId: 1, senderId: 1 });
conversationSchema.index({ "participants.userId": 1, type: 1 });

const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);
const Conversation = mongoose.models.Conversation || mongoose.model("Conversation", conversationSchema);

module.exports = { Message, Conversation };