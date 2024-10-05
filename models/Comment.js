const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Comment Schema
const commentSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post", // Updated to refer to "Post" instead of "Movie"
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    text: {
      type: String,
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
      wow: { type: Number, default: 0 },
      funny: { type: Number, default: 0 },
      sad: { type: Number, default: 0 },
      angry: { type: Number, default: 0 },
    },
    repliesCount: { type: Number, default: 0 },
    replies: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        text: { type: String, required: true },
        date: { type: Date, default: Date.now },
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
          wow: { type: Number, default: 0 },
          funny: { type: Number, default: 0 },
          sad: { type: Number, default: 0 },
          angry: { type: Number, default: 0 },
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

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
      wow: { type: Number, default: 0 },
      funny: { type: Number, default: 0 },
      sad: { type: Number, default: 0 },
      angry: { type: Number, default: 0 },
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
  {
    timestamps: true,
  }
);

module.exports = {
  Comment: mongoose.model("Comment", commentSchema),
  Review: mongoose.model("Review", reviewSchema),
};
