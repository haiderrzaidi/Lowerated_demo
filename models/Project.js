const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Tool-specific role schema
const roleSchema = new Schema({
  tool: {
    type: String,
    required: true,
  },
  access: {
    type: String,
    enum: ["editor", "commenter", "viewer"],
    required: true,
  },
});

// Collaborator schema with tool-specific roles and detailed film roles
const collaboratorSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  roles: [roleSchema], // An array of roles for different tools
  filmRole: {
    type: String,
    required: true,
  },
});

const projectSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, "Please enter the project title"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    genre: {
      type: String,
      trim: true,
    },
    plot: {
      type: String,
      trim: true,
    },
    scripts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Script",
      },
    ],
    ideas: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "IdeaGeneration",
      },
    ],
    characters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Character",
      },
    ],
    cast: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cast",
      },
    ],
    funds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Fund",
      },
    ],
    marketing: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Marketing",
      },
    ],
    schedules: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Schedule",
      },
    ],
    status: {
      type: String,
      enum: ["draft", "in-progress", "completed"],
      default: "draft",
    },
    tags: {
      type: [String],
      default: [],
    },
    collaborators: [collaboratorSchema],
    changeLog: [
      {
        changedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        changeDate: { type: Date, default: Date.now },
        changeType: { type: String }, // e.g., 'update', 'add_collaborator', etc.
        description: { type: String },
      },
    ],
  },
  {
    timestamps: true, // This will automatically create `createdAt` and `updatedAt` fields
  }
);

// Pre-save hook to update `updatedAt` field
projectSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Project", projectSchema);
