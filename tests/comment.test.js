// tests/comment.test.js

const request = require('supertest');
const { app } = require('../server');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
let token, taskId, commentId;


beforeAll(async () => {
    // Pre-create a user in the database
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('password123', salt);

    const user = await User.create({ name: 'testuser2', email: 'testuser2@example.com', password: password });
    
    const loginRes = await request(app)
        .post('/api/auth/login')
        .send({
        email: 'testuser2@example.com',
        password: 'password123'
        });
    token = loginRes.body.token;
    userId = user._id;

    // Create a test task
    const taskRes = await request(app)
        .post('/api/tasks')
        .set('x-auth-token', `${token}`)
        .send({
        title: 'Test Task for Comments',
        description: 'Testing comments on this task.'
        });

    taskId = taskRes.body._id;
});


describe('Comment Management', () => {
    it('should create a new comment on a task, update and delete', async () => {
        const res = await request(app)
        .post(`/api/comments`)
        .set('x-auth-token', `${token}`)
        .send({
            content: 'This is a test comment.',
            taskId: taskId,
        });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('content', 'This is a test comment.');
        commentId = res.body._id;

        const resUpdate = await request(app)
        .put(`/api/comments/${commentId}`)
        .set('x-auth-token', `${token}`)
        .send({
            content: 'This is an updated comment.',
        });
        expect(resUpdate.statusCode).toEqual(200);
        expect(resUpdate.body.message).toEqual('Comment updated successfully.');

        const resDelete = await request(app)
        .delete(`/api/comments/${commentId}`)
        .set('x-auth-token', `${token}`);
        expect(resDelete.statusCode).toEqual(200);
        expect(resDelete.body.message).toEqual('Comment deleted successfully.');
    });
});
