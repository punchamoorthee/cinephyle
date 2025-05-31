const mongoose = require("mongoose");

const logEntrySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    tmdbId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 0.5,
      max: 5,
      required: false,
      validate: {
        validator: function (v) {
          return (v * 2) % 1 === 0;
        },
        message: (props) =>
          `${props.value} is not a valid rating step (must be in 0.5 increments)`,
      },
    },
    watchedAt: {
      type: String,
      enum: [
        "Cinema / Public Venue",
        "Home",
        "Someone Else's Home",
        "Travel / On the go",
        "Other",
        "Prefer not to say",
      ],
    },
    watchedWith: {
      type: String,
      enum: [
        "Alone",
        "Partner/Date",
        "Family/Friends",
        "Larger Group",
        "Other",
        "Prefer not to say",
      ],
    },
    reviewText: {
      type: String,
      trim: true,
      maxLength: 5000,
    },
    loggedDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const logEntry = mongoose.model("LogEntry", logEntrySchema);

module.exports = logEntry;
