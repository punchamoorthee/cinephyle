const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyFirebaseToken = require('../middleware/authMiddleware');

// POST /api/users/init
router.post('/init', verifyFirebaseToken, userController.initializeUser);

module.exports = router;