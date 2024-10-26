const Team = require('../models/Team');
const Task = require('../models/Task');

// Create a new team
exports.createTeam = async (req, res) => {
    const { name, description } = req.body;
    try {
        const team = new Team({
        name,
        description,
        members: [req.userId], // Add the creator as a member
        });
        await team.save();
        res.json(team);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

// Add a user to the team
exports.addMember = async (req, res) => {
    const { teamId } = req.params;
    const { userId } = req.body;
    try {
        const team = await Team.findById(teamId);
        if (!team) return res.status(404).json({ msg: 'Team not found' });

        if (!team.members.includes(userId)) {
        team.members.push(userId);
        await team.save();
        }
        res.json(team);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

// Assign a task to the team
exports.assignTaskToTeam = async (req, res) => {
    const { teamId, taskId } = req.params;
    try {
        const team = await Team.findById(teamId);
        const task = await Task.findById(taskId);
        if (!team || !task) return res.status(404).json({ msg: 'Team or Task not found' });

        team.tasks.push(task._id);
        await team.save();

        res.json(team);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

// Get all tasks in a team
exports.getTeamTasks = async (req, res) => {
    const { teamId } = req.params;
    try {
        const team = await Team.findById(teamId).populate('tasks');
        if (!team) return res.status(404).json({ msg: 'Team not found' });

        res.json(team.tasks);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

// Get all members of a specific team
exports.getTeamMembers = async (req, res) => {
    try {
        const team = await Team.findById(req.params.teamId).populate('members', 'name email'); // populate 'members' with 'name' and 'email'

    if (!team) {
        return res.status(404).json({ message: 'Team not found' });
    }

    res.status(200).json({ members: team.members });
    } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
    }
};