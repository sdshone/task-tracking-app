const express = require('express');
const { createTeam, addMember, assignTaskToTeam, getTeamTasks, getTeamMembers } = require('../controllers/teamController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Team routes
router.post('/', authMiddleware, createTeam);
router.post('/:teamId/members', authMiddleware, addMember);
router.get('/:teamId/members', authMiddleware, getTeamMembers);
router.post('/:teamId/tasks/:taskId', authMiddleware, assignTaskToTeam);
router.get('/:teamId/tasks', authMiddleware, getTeamTasks);

module.exports = router;
