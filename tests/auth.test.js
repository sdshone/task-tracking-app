// auth.test.js
const request = require('supertest');
const { app } = require('../server'); // Your Express app
const User = require('../models/User'); // Your User model
const bcrypt = require('bcryptjs');



describe('Auth API Endpoints', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'testuser',
        email: 'testuser@example.com',
        password: 'password123',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');

    // Verify the user in the in-memory database
    const user = await User.findOne({ email: 'testuser@example.com' });
    expect(user).toBeTruthy();
    expect(user.name).toBe('testuser');
  });

  it('should prevent duplicate registration', async () => {
    // Pre-insert a user to simulate a duplicate registration
    await User.create({ name: 'testuser', email: 'testuser@example.com', password: 'password123' });

    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'testuser',
        email: 'testuser@example.com',
        password: 'password123',
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body.msg).toBe('User already exists');
  });

  it('should login an existing user', async () => {
    // Pre-create a user in the database
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('password123', salt);

    await User.create({ name: 'testuser', email: 'testuser@example.com', password: password });

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should not login with incorrect password', async () => {
    // Pre-create a user in the database
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('password123', salt);

    await User.create({ name: 'testuser', email: 'testuser@example.com', password: password });

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'wrongpassword',
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body.msg).toBe('Invalid credentials');
  });
});
