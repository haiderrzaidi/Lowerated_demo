const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please add the movie title."],
    },
    LR: {
      type: Number,
      default: 0,
    },
    genre: [
      {
        type: String,
        enum: [
          "Action",
          "Adventure",
          "Animation",
          "Biography",
          "Comedy",
          "Crime",
          "Documentary",
          "Drama",
          "Family",
          "Fantasy",
          "Film-Noir",
          "History",
          "Horror",
          "Music",
          "Musical",
          "Mystery",
          "Romance",
          "Sci-Fi",
          "Sport",
          "Thriller",
          "War",
          "Western",
          "Sitcom",
          "Costume",
          "Psychological",
          "Mythological",
          "Thriller",
          "Mystery",
          "Short",
          "News",
          "Reality-TV",
        ],
      },
    ],
    releaseDate: {
      type: Date,
      required: [true, "Please add the Date of release."],
    },
    summary: {
      type: String,
    },
    actors: [
      {
        name: String,
        link: String,
      },
    ],
    cinematographer: {
      name: String,
      link: String,
    },
    director: {
      name: String,
      link: String,
    },
    writer: [
      {
        name: String,
        link: String,
        role: {
          type: String,
        },
      },
    ],
    image: {
      type: String,
    },
    musicBy: [
      {
        name: String,
        link: String,
      },
    ],
    producer: {
      name: String,
      link: String,
    },
    country: [
      {
        type: String,
        enum: [
          // List of countries
        ],
      },
    ],
    language: [
      {
        type: String,
      },
    ],
    availableOn: [
      {
        name: String,
        link: String,
      },
    ],
    downloadLink: {
      type: String,
    },
    trailerLink: {
      type: String,
    },
    noSpoilerSummary: {
      type: String,
    },
    durationMins: {
      type: Number,
    },
    podcastLink: {
      type: String,
    },
    budget: {
      type: Number,
    },
    revenue: {
      type: Number,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    likesCount: {
      type: Number,
      default: 0,
    },
    watchCount: {
      type: Number,
      default: 0,
    },
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
    reviewsCount: {
      type: Number,
      default: 0,
    },
    postsCount: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Movie", movieSchema);
