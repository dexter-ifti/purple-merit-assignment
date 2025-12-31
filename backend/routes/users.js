const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// Admin routes
// GET /api/users for the admins
router.get('/', authenticateToken, requireAdmin, userController.getUsers);
// PATCH /api/users/:id/status
router.patch('/:id/status', authenticateToken, requireAdmin, userController.updateStatus);

// User routes
// PUT /api/users/profile
router.put('/profile', authenticateToken, userController.updateProfile);
// PUT /api/users/password
router.put('/password', authenticateToken, userController.changePassword);

module.exports = router;
