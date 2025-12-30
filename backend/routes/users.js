const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// Admin routes
router.get('/', authenticateToken, requireAdmin, userController.getUsers);
router.patch('/:id/status', authenticateToken, requireAdmin, userController.updateStatus);

// User routes
router.put('/profile', authenticateToken, userController.updateProfile);
router.put('/password', authenticateToken, userController.changePassword);

module.exports = router;
