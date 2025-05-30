const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startWith("Bearer ")) {
    return res.status(401).json({
      message: "Unauthorized: No token provided or invalid format.",
    });
  }
  const idToken = authHeader.split("Bearer ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
    };
    next(); // Proceed to next middleware or route handler
  } catch (error) {
    console.error("Error verifying Firebase ID token", error);
    if (error.code === "auth/id-token-expired") {
      return res.status(401).json({ message: "Forbidden: Invalid token." });
    }
  }
};

module.exports = verifyFirebaseToken;
