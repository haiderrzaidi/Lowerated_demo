const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    username: {
      type: String,
      unique: true,
      required: [true, "Please enter Username"],
      trim: true,
      index: true,
    },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    contact: { type: String, trim: true },
    email: {
      type: String,
      required: [true, "Please enter Email"],
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
      trim: true,
      index: true,
    },
    emailVerified: { type: Boolean, default: false },
    isComplete: { type: Boolean, default: false },
    socials: [
      {
        name: { type: String, trim: true },
        link: { type: String, trim: true },
      },
    ],
    bio: { type: String, trim: true },
    profileImage: { type: String, trim: true },
    coverImage: { type: String, trim: true },
    followersCount: { type: Number, default: 0 },
    followers: [
      {
        type: String, // Using string instead of ObjectId
        ref: "User",
      },
    ],
    followingCount: { type: Number, default: 0 },
    following: [
      {
        type: String, // Using string instead of ObjectId
        ref: "User",
      },
    ],
    likedScripts: [
      {
        type: String, // Using string instead of ObjectId
        ref: "Script",
      },
    ],
    badges: [{ type: String, ref: "Badge" }], // Using string instead of ObjectId
    isBanned: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
    roles: {
      type: [String],
      enum: ["user", "head", "admin"],
      default: ["user"],
    },
    postsCount: { type: Number, default: 0 },
    posts: [
      {
        type: String, // Using string instead of ObjectId
        ref: "Post",
      },
    ],
    projects: [
      {
        type: String, // Using string instead of ObjectId
        ref: "Project",
      },
    ],
    chats: [
      {
        type: String, // Using string instead of ObjectId
        ref: "Chat",
      },
    ],
    notifications: [
      {
        type: String, // Using string instead of ObjectId
        ref: "Notification",
      },
    ],
    unreadNotificationsCount: { type: Number, default: 0 },
    preferences: {
      notifications: {
        email: { type: Boolean, default: true },
        sms: { type: Boolean, default: false },
      },
      theme: { type: String, enum: ["light", "dark"], default: "light" },
      language: { type: String, default: "en" },
    },
    address: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      country: { type: String, trim: true },
      zip: { type: String, trim: true },
    },
    lastLogin: { type: Date },
    loginAttempts: { type: Number, default: 0 },
    accountLocked: { type: Boolean, default: false },
    oauthProviders: [
      {
        provider: { type: String, trim: true },
        providerId: { type: String, trim: true },
      },
    ],
    subscription: {
      type: String, // Using string instead of ObjectId
      ref: "Subscription",
    },
    activityLog: [
      {
        activityType: { type: String },
        activityDate: { type: Date, default: Date.now },
        details: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Ensure the model is only defined once
const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;