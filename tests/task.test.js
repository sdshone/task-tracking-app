const request = require('supertest');
const { app } = require('../server'); // Your Express app
const User = require('../models/User'); // Your User model
const bcrypt = require('bcryptjs');

let token;


beforeAll(async () => {
    // Pre-create a user in the database
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('password123', salt);

    await User.create({ name: 'testuser2', email: 'testuser2@example.com', password: password });
    
    const loginRes = await request(app)
        .post('/api/auth/login')
        .send({
        email: 'testuser2@example.com',
        password: 'password123'
        });
    token = loginRes.body.token;
});


describe('Task Management API', () => {

    it('should create a new task', async () => {
        const res = await request(app)
        .post('/api/tasks')
        .set('x-auth-token', `${token}`)
        .send({
            title: 'Test Task',
            description: 'This is a test task',
            dueDate: '2024-10-31',
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('title', 'Test Task');
    });

    it('should fetch all tasks for the logged-in user', async () => {
        const res = await request(app)
        .get('/api/tasks')
        .set('x-auth-token', `${token}`)
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should update a task', async () => {
        const createRes = await request(app)
        .post('/api/tasks')
        .set('x-auth-token', `${token}`)
        .send({
            title: 'Task to update',
            description: 'This task will be updated',
            dueDate: '2024-11-15',
        });
        const taskId = createRes.body._id;

        const res = await request(app)
        .put(`/api/tasks/${taskId}`)
        .set('x-auth-token', `${token}`)
        .send({
            status: 'completed'
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('status', 'completed');
    });

});
