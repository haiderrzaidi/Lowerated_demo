const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Transaction Schema
const transactionSchema = new Schema(
  {
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    scriptId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Script",
      required: true,
    },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Idea Generation Schema
const ideaGenerationSchema = new Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    botConversation: [
      {
        message: String,
        sender: { type: String, enum: ["user", "bot"] },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    finalIdea: {
      plot: { type: String },
      genre: { type: String },
      drafts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Draft" }],
    },
  },
  { timestamps: true }
);

// Draft Schema
const draftSchema = new Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    title: { type: String, required: true },
    content: { type: String, required: true },
    version: { type: Number, default: 1 },
  },
  { timestamps: true }
);

// Character Schema
const characterSchema = new Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    name: { type: String, required: true },
    age: { type: Number },
    image: { type: String }, // URL to character image
    personality: { type: String },
    development: { type: String },
  },
  { timestamps: true }
);

// Book Schema
const bookSchema = new Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    title: { type: String, required: true },
    chapters: [
      {
        title: { type: String, required: true },
        content: { type: String, required: true },
      },
    ],
    drafts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Draft",
      },
    ],
    isPublished: { type: Boolean, default: false },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true }
);

// Script Schema with Elements
const scriptElementSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  content: { type: String, required: true },
});

const scriptSchema = new Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    writer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    drafts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Draft",
      },
    ],
    title: { type: String, required: true },
    elements: [scriptElementSchema],
    isPublished: { type: Boolean, default: false },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true }
);

// Export all models
export const Transaction = mongoose.model("Transaction", transactionSchema);
export const IdeaGeneration = mongoose.model(
  "IdeaGeneration",
  ideaGenerationSchema
);
export const Draft = mongoose.model("Draft", draftSchema);
export const Character = mongoose.model("Character", characterSchema);
export const Book = mongoose.model("Book", bookSchema);
export const Script = mongoose.model("Script", scriptSchema);
