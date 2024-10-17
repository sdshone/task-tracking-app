const express = require('express');
const { createTeam, addMember, assignTaskToTeam, getTeamTasks } = require('../controllers/teamController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Team routes
router.post('/', authMiddleware, createTeam);
router.post('/:teamId/members', authMiddleware, addMember);
router.post('/:teamId/tasks/:taskId', authMiddleware, assignTaskToTeam);
router.get('/:teamId/tasks', authMiddleware, getTeamTasks);

module.exports = router;
