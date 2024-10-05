const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Review Schema
const reviewSchema = new Schema(
  {
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    reactions: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        reactionType: {
          type: String,
          enum: ["like", "love", "brilliant", "support"],
        },
      },
    ],
    reactionCount: {
      like: { type: Number, default: 0 },
      love: { type: Number, default: 0 },
      brilliant: { type: Number, default: 0 },
      support: { type: Number, default: 0 },
    },
    datePosted: { type: Date, default: Date.now },
    LR: { type: Number },
    AIRating: {
      story: { type: Number },
      cinematography: { type: Number },
      directing: { type: Number },
      characters: { type: Number },
      production: { type: Number },
      uniqueConcepts: { type: Number },
      emotions: { type: Number },
    },
    review: {
      story: { type: String },
      cinematography: { type: String },
      directing: { type: String },
      characters: { type: String },
      production: { type: String },
      uniqueConcepts: { type: String },
      emotions: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
