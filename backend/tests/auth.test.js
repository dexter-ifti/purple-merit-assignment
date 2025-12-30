// tests/auth.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_TEST_URI);
});

afterAll(async () => {
  await User.deleteMany({});
  await mongoose.connection.close();
});

describe('Authentication Tests', () => {
  
  // Test 1: User Signup
  describe('POST /api/auth/signup', () => {
    it('should create a new user successfully', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send({
          email: 'test@example.com',
          password: 'Test@123',
          fullName: 'Test User'
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user).toHaveProperty('email', 'test@example.com');
      expect(res.body.user).toHaveProperty('role', 'user');
    });

    it('should reject signup with invalid email', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send({
          email: 'invalid-email',
          password: 'Test@123',
          fullName: 'Test User'
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error', 'Invalid email format');
    });

    it('should reject weak password', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send({
          email: 'test2@example.com',
          password: 'weak',
          fullName: 'Test User'
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toContain('Password must be');
    });

    it('should reject duplicate email', async () => {
      await request(app)
        .post('/api/auth/signup')
        .send({
          email: 'duplicate@example.com',
          password: 'Test@123',
          fullName: 'First User'
        });

      const res = await request(app)
        .post('/api/auth/signup')
        .send({
          email: 'duplicate@example.com',
          password: 'Test@123',
          fullName: 'Second User'
        });

      expect(res.statusCode).toBe(409);
      expect(res.body).toHaveProperty('error', 'Email already registered');
    });
  });

  // Test 2: User Login
  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      await request(app)
        .post('/api/auth/signup')
        .send({
          email: 'logintest@example.com',
          password: 'Test@123',
          fullName: 'Login Test'
        });
    });

    it('should login successfully with correct credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'logintest@example.com',
          password: 'Test@123'
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('message', 'Login successful');
    });

    it('should reject login with wrong password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'logintest@example.com',
          password: 'WrongPassword@123'
        });

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('error', 'Invalid credentials');
    });

    it('should reject login for non-existent user', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'Test@123'
        });

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('error', 'Invalid credentials');
    });
  });

  // Test 3: Get Current User
  describe('GET /api/auth/me', () => {
    let token;

    beforeEach(async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send({
          email: 'metest@example.com',
          password: 'Test@123',
          fullName: 'Me Test'
        });
      token = res.body.token;
    });

    it('should return current user with valid token', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.user).toHaveProperty('email', 'metest@example.com');
      expect(res.body.user).not.toHaveProperty('password');
    });

    it('should reject request without token', async () => {
      const res = await request(app)
        .get('/api/auth/me');

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('error', 'Access token required');
    });

    it('should reject request with invalid token', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer invalid_token');

      expect(res.statusCode).toBe(403);
      expect(res.body).toHaveProperty('error', 'Invalid or expired token');
    });
  });

  // Test 4: Update Profile
  describe('PUT /api/users/profile', () => {
    let token;

    beforeEach(async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send({
          email: 'updatetest@example.com',
          password: 'Test@123',
          fullName: 'Update Test'
        });
      token = res.body.token;
    });

    it('should update profile successfully', async () => {
      const res = await request(app)
        .put('/api/users/profile')
        .set('Authorization', `Bearer ${token}`)
        .send({
          fullName: 'Updated Name',
          email: 'updated@example.com'
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.user).toHaveProperty('fullName', 'Updated Name');
      expect(res.body.user).toHaveProperty('email', 'updated@example.com');
    });

    it('should reject invalid email update', async () => {
      const res = await request(app)
        .put('/api/users/profile')
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: 'invalid-email'
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error', 'Invalid email format');
    });
  });

  // Test 5: Change Password
  describe('PUT /api/users/password', () => {
    let token;

    beforeEach(async () => {
      // ensure previous test data for this email is removed to avoid duplicate signup
      await User.deleteOne({ email: 'passwordtest@example.com' });
      const res = await request(app)
        .post('/api/auth/signup')
        .send({
          email: 'passwordtest@example.com',
          password: 'Test@123',
          fullName: 'Password Test'
        });
      token = res.body.token;
    });

    it('should change password successfully', async () => {
      const res = await request(app)
        .put('/api/users/password')
        .set('Authorization', `Bearer ${token}`)
        .send({
          currentPassword: 'Test@123',
          newPassword: 'NewTest@456'
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Password changed successfully');
    });

    it('should reject with wrong current password', async () => {
      const res = await request(app)
        .put('/api/users/password')
        .set('Authorization', `Bearer ${token}`)
        .send({
          currentPassword: 'WrongPassword@123',
          newPassword: 'NewTest@456'
        });

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('error', 'Current password is incorrect');
    });

    it('should reject weak new password', async () => {
      const res = await request(app)
        .put('/api/users/password')
        .set('Authorization', `Bearer ${token}`)
        .send({
          currentPassword: 'Test@123',
          newPassword: 'weak'
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toContain('Password must be');
    });
  });
});

// Test 6: Admin Operations
describe('Admin Operations', () => {
  let adminToken;
  let userToken;
  let userId;

  beforeAll(async () => {
    // Create admin user
    const admin = new User({
      email: 'admin@example.com',
      password: await bcrypt.hash('Admin@123', 10),
      fullName: 'Admin User',
      role: 'admin',
      status: 'active'
    });
    await admin.save();

    const adminLogin = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@example.com',
        password: 'Admin@123'
      });
    adminToken = adminLogin.body.token;

    // Create regular user
    const userRes = await request(app)
      .post('/api/auth/signup')
      .send({
        email: 'regularuser@example.com',
        password: 'User@123',
        fullName: 'Regular User'
      });
    userToken = userRes.body.token;
    userId = userRes.body.user.id;
  });

  describe('GET /api/users', () => {
    it('should allow admin to get all users', async () => {
      const res = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('users');
      expect(Array.isArray(res.body.users)).toBe(true);
      expect(res.body).toHaveProperty('pagination');
    });

    it('should reject non-admin user', async () => {
      const res = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.statusCode).toBe(403);
      expect(res.body).toHaveProperty('error', 'Admin access required');
    });
  });

  describe('PATCH /api/users/:id/status', () => {
    it('should allow admin to change user status', async () => {
      const res = await request(app)
        .patch(`/api/users/${userId}/status`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ status: 'inactive' });

      expect(res.statusCode).toBe(200);
      expect(res.body.user).toHaveProperty('status', 'inactive');
    });

    it('should reject non-admin user', async () => {
      const res = await request(app)
        .patch(`/api/users/${userId}/status`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ status: 'active' });

      expect(res.statusCode).toBe(403);
      expect(res.body).toHaveProperty('error', 'Admin access required');
    });
  });
});
