// tests/team.test.js

const request = require('supertest');
const { app } = require('../server');
const Team = require('../models/Team');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

let token, userId, teamId;

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
});


describe('Team Management', () => {
    it('should create a new team, add a user, get all members', async () => {
        const res = await request(app)
        .post('/api/teams')
        .set('x-auth-token', `${token}`)
        .send({
            name: 'Team Alpha'
        });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('name', 'Team Alpha');
        teamId = res.body._id;

        const resUpdate = await request(app)
        .post(`/api/teams/${teamId}/members`)
        .set('x-auth-token', `${token}`)
        .send({
            userId
        });

        expect(resUpdate.statusCode).toEqual(200);
        expect(resUpdate.body.members.map(id => id.toString())).toContain(userId.toString());
        const resGet = await request(app)
        .get(`/api/teams/${teamId}/members`)
        .set('x-auth-token', `${token}`);

        expect(resGet.statusCode).toEqual(200);
        expect(resGet.body.members.map(member => member._id.toString())).toContain(userId.toString());
    });
});
