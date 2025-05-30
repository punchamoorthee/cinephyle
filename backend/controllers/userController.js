const User = require("../models/User");

// Intialize user profile in MongoDB if it doesn't exist
exports.initializeUser = async (req, res, next) => {
  const { uid, email } = req.user;

  console.log(uid, email);

  if (!uid || !email) {
    return res
      .status(400)
      .json({
        message: "Firebase UID and email and username are required from token.",
      });
  }

  try {
    let user = await User.findOne({ firebaseUID: uid });

    if (user) {
      return res
        .status(200)
        .json({ message: "User already initialized.", user });
    } else {
      const newUser = new User({
        firebaseUID: uid,
        email: email,
      });

      await newUser.save();
      return res
        .status(201)
        .json({ message: "User initiated successfully", user: newUser });
    }
  } catch (error) {
    console.error("Error initializing user.", error);
    res.status(500).json({
      message: "Server error during user initialization.",
      error: error.message,
    });
  }
};
