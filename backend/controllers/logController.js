const LogEntry = require("../models/logEntry");

const createLogEntry = async (req, res, next) => {
  try {
    const {
      tmdbId,
      title,
      posterPath,
      rating,
      watchedAt,
      watchedWith,
      reviewText,
    } = req.body;

    const userId = req.user.uid;

    if (!userId) {
      return res.status(401).json({ message: "User is not authenticated" });
    }

    if (!tmdbId || !title) {
      return res
        .status(400)
        .json({ message: "tmdbId and title are required." });
    }

    if (rating != undefined) {
      const numRating = parseFloat(rating);
      if (
        isNaN(numRating) ||
        numRating < 0.5 ||
        numRating > 5 ||
        (numRating * 2) % 1 === 0
      ) {
        return res
          .status(400)
          .json({
            message: "Rating must be between 0.5 and 5, and in 0.5 increments.",
          });
      }
    }

    const newLogEntry = new LogEntry({
      userId,
      tmdbId,
      title,
      posterPath,
      rating,
      watchedAt,
      watchedWith,
      reviewText,
    });

    const savedLogEntry = await newLogEntry.save();
    res.status(201).json(savedLogEntry);
  } catch (error) {
    console.error("Error creating log entry.", error);
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Server error while creating log entry." });
    }
    res.status(500).json({ message: "Server error while creating log entry." });
  }
};

module.exports = {
  createLogEntry,
};
