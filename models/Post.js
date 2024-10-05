const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Post schema
const postSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      enum: ["movie", "music", "tv-show", "series", "book"], // Removed duplicate "music"
    },
    title: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    caption: {
      type: String,
      trim: true,
    },
    text: {
      type: String,
      trim: true,
    },
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    location: {
      type: String,
      trim: true,
    },
    views: {
      type: Number,
      default: 0,
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
      like: {
        type: Number,
        default: 0,
      },
      love: {
        type: Number,
        default: 0,
      },
      brilliant: {
        type: Number,
        default: 0,
      },
      support: {
        type: Number,
        default: 0,
      },
    },
    sharesCount: {
      type: Number,
      default: 0,
    },
    shares: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        shareCaption: {
          type: String,
          trim: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    commentsCount: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Export the Post model
module.exports = mongoose.model("Post", postSchema);
