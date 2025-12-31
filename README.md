# 🚀 User Management System

A full-stack web application for managing user accounts with role-based access control, built with Node.js, Express, MongoDB, React, and Tailwind CSS.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.2.0-blue.svg)

## 📑 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Security Features](#security-features)
- [Contributing](#contributing)
- [License](#license)

---

##  Overview

The User Management System is a modern, secure, and scalable web application designed to handle user authentication, authorization, and account management. It provides a clean interface for both administrators and regular users to manage their accounts efficiently.

### Key Highlights

- **Secure Authentication**: JWT-based authentication with bcrypt password hashing
- **Role-Based Access Control**: Separate interfaces for admins and users
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **RESTful API**: Well-structured backend with proper error handling
- **Real-time Feedback**: Toast notifications and loading states
- **Search & Filter**: Easy user discovery with search functionality
- **Comprehensive Testing**: Unit tests for critical functionality

---

##  Features

### Authentication & Authorization
- ✅ User registration with email verification
- ✅ Secure login with JWT tokens
- ✅ Password strength validation
- ✅ Protected routes with role-based access
- ✅ Automatic token expiration and refresh
- ✅ Secure logout functionality

### Admin Features
- ✅ View all users with pagination
- ✅ Search users by name, email, or role
- ✅ Activate/deactivate user accounts
- ✅ User statistics dashboard
- ✅ Real-time data refresh
- ✅ Confirmation dialogs for critical actions

### User Features
- ✅ View and edit personal profile
- ✅ Update full name and email
- ✅ Change password with validation
- ✅ View account status and creation date
- ✅ Secure profile updates

### UI/UX Features
- ✅ Responsive design (mobile-first)
- ✅ Loading states and spinners
- ✅ Toast notifications (success/error)
- ✅ Modal confirmations
- ✅ Form validation with error messages

---

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js (v16+)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcryptjs
- **Validation**: Custom middleware
- **Testing**: Jest + Supertest

### Frontend
- **Framework**: React
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Fetch API
- **State Management**: React Hooks (useState, useEffect, useContext)

### DevOps & Deployment
- **Backend Hosting**: Render 
- **Frontend Hosting**: Vercel
- **Database Hosting**: MongoDB Atlas
- **Version Control**: Git
- **Environment Management**: dotenv

---

## 🏗️ Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Layer                         │
│  (React SPA - Vite + Tailwind CSS + Lucide Icons)          │
│  - Auth Pages (Login/Signup)                                │
│  - Admin Dashboard                                           │
│  - User Profile                                              │
│  - Protected Routes                                          │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTPS/REST API
                     │
┌────────────────────▼────────────────────────────────────────┐
│                      API Gateway Layer                       │
│  (Express.js Middleware)                                    │
│  - CORS Handler                                             │
│  - Body Parser                                              │
│  - Authentication Middleware                                │
│  - Error Handler                                            │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│                     Business Logic Layer                     │
│  (Express Routes + Controllers)                             │
│  - Auth Controller (signup, login, logout)                  │
│  - User Controller (CRUD operations)                        │
│  - Admin Controller (user management)                       │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│                      Data Access Layer                       │
│  (Mongoose Models)                                          │
│  - User Model                                               │
│  - Validation Schemas                                       │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│                       Database Layer                         │
│  (MongoDB Atlas - Cloud Database)                           │
│  - Users Collection                                         │
│  - Indexes (email)                                          │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **User Request** → Client makes HTTP request
2. **Authentication** → JWT token validated by middleware
3. **Authorization** → Role-based access check
4. **Business Logic** → Controllers process the request
5. **Database** → Mongoose models interact with MongoDB
6. **Response** → JSON response sent back to client
7. **UI Update** → React components re-render with new data

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.0.0 or higher)
  ```bash
  node --version
  ```

- **npm** (v7.0.0 or higher)
  ```bash
  npm --version
  ```

- **MongoDB Account** (MongoDB Atlas free tier)
  - Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

- **Git** (for version control)
  ```bash
  git --version
  ```

### Recommended Tools

- **Code Editor**: VS Code with extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - ES7+ React/Redux/React-Native snippets
  
- **API Testing**: Postman or Thunder Client
- **Database GUI**: MongoDB Compass

---

## 📥 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/dexter-ifti/purple-merit-assignment.git
cd purple-merit-assignment
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
nano .env
```

**Backend Dependencies:**
```json
{
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.0.0",
    "swagger-autogen": "^2.23.7",
    "swagger-jsdoc": "^6.2.8",
    "swagger-ui-express": "^5.0.1"
}
```

**Dev Dependencies:**
```json
{
  "nodemon": "^3.0.1",
  "jest": "^29.7.0",
  "supertest": "^6.3.3"
}
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from root)
cd ../frontend

# Install dependencies
npm install
```

**Frontend Dependencies:**
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "lucide-react": "^0.263.1"
}
```

**Dev Dependencies:**
```json
{
  "vite": "^5.0.0",
  "tailwindcss": "^3.3.0",
  "postcss": "^8.4.31",
  "autoprefixer": "^10.4.16",
  "@vitejs/plugin-react": "^4.2.0"
}
```

---

## ⚙️ Configuration

### Backend Configuration (.env)

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/usermanagement?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_min_32_characters_long_change_in_production
JWT_EXPIRE=24h

# CORS Configuration (Frontend URL)
FRONTEND_URL=http://localhost:5173

# Test Database (for running tests)
MONGODB_TEST_URI=mongodb+srv://username:password@cluster.mongodb.net/usermanagement_test?retryWrites=true&w=majority
```

### Frontend Configuration

Create a `.env` file in the `frontend` directory:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api
```

### MongoDB Atlas Setup

1. **Create Account**
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free tier

2. **Create Cluster**
   - Click "Build a Database"
   - Choose M0 (Free tier)
   - Select your preferred region
   - Click "Create Cluster"

3. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose username/password authentication
   - Set username and strong password
   - Grant "Read and Write" permissions

4. **Configure Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - For development: Choose "Allow Access from Anywhere" (0.0.0.0/0)
   - For production: Add specific IP addresses

5. **Get Connection String**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Update `MONGODB_URI` in `.env`

### Generate JWT Secret

```bash
# Generate a random JWT secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🚀 Running the Application

### Development Mode

#### Start Backend Server

```bash
cd backend
npm run dev
```

Server will start at `http://localhost:5000`

You should see:
```
Server running on port 5000
Connected to MongoDB
```

#### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

Frontend will start at `http://localhost:5173`

You should see:
```
  VITE v5.0.0  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

## 🐳 Docker

You can run the whole stack (MongoDB, backend, frontend) with Docker Compose. A `docker-compose.yml` is included at the repo root and builds container images for the backend and frontend.

Quick start (from project root):

```bash
# build images and start services
docker compose up --build
```

Services and ports exposed by the compose file:
- mongo: 27017
- backend: 5000
- frontend (nginx): 80


---

## 📡 API Documentation [Live Link](https://purple-merit-assignment-zcie.onrender.com/doc/)

### Base URL
```
Development: http://localhost:5000/api
Production: https://purple-merit-assignment-zcie.onrender.com/api
```

### Authentication Endpoints

#### 1. User Signup
```http
POST /api/auth/signup
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass@123"
}
```

**Response (201 Created):**
```json
{
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f5a8b9c8e9f5001a8c9d1e",
    "email": "john@example.com",
    "fullName": "John Doe",
    "role": "user",
    "status": "active"
  }
}
```

#### 2. User Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass@123"
}
```

**Response (200 OK):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f5a8b9c8e9f5001a8c9d1e",
    "email": "john@example.com",
    "fullName": "John Doe",
    "role": "user",
    "status": "active"
  }
}
```

#### 3. Get Current User
```http
GET /api/auth/me
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "user": {
    "id": "64f5a8b9c8e9f5001a8c9d1e",
    "email": "john@example.com",
    "fullName": "John Doe",
    "role": "user",
    "status": "active",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "lastLogin": "2024-01-20T14:25:00.000Z"
  }
}
```

#### 4. Logout
```http
POST /api/auth/logout
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "message": "Logout successful"
}
```

### User Management Endpoints

#### 5. Get All Users (Admin Only)
```http
GET /api/users?page=1&limit=10
Authorization: Bearer {admin_token}
```

**Response (200 OK):**
```json
{
  "users": [
    {
      "id": "64f5a8b9c8e9f5001a8c9d1e",
      "email": "john@example.com",
      "fullName": "John Doe",
      "role": "user",
      "status": "active",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "lastLogin": "2024-01-20T14:25:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

#### 6. Update User Status (Admin Only)
```http
PATCH /api/users/{userId}/status
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "status": "inactive"
}
```

**Response (200 OK):**
```json
{
  "message": "User deactivated successfully",
  "user": {
    "id": "64f5a8b9c8e9f5001a8c9d1e",
    "email": "john@example.com",
    "fullName": "John Doe",
    "role": "user",
    "status": "inactive"
  }
}
```

#### 7. Update Own Profile
```http
PUT /api/users/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "fullName": "John Updated Doe",
  "email": "john.updated@example.com"
}
```

**Response (200 OK):**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": "64f5a8b9c8e9f5001a8c9d1e",
    "email": "john.updated@example.com",
    "fullName": "John Updated Doe",
    "role": "user",
    "status": "active"
  }
}
```

#### 8. Change Password
```http
PUT /api/users/password
Authorization: Bearer {token}
Content-Type: application/json

{
  "currentPassword": "SecurePass@123",
  "newPassword": "NewSecurePass@456"
}
```

**Response (200 OK):**
```json
{
  "message": "Password changed successfully"
}
```

### Error Responses

**400 Bad Request:**
```json
{
  "error": "Invalid email format"
}
```

**401 Unauthorized:**
```json
{
  "error": "Invalid credentials"
}
```

**403 Forbidden:**
```json
{
  "error": "Admin access required"
}
```

**404 Not Found:**
```json
{
  "error": "User not found"
}
```

**409 Conflict:**
```json
{
  "error": "Email already registered"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Internal server error"
}
```

---

## 🧪 Testing

### Running Tests

#### Backend Unit Tests

```bash
cd backend
npm test
```

**Test Coverage:**
- ✅ User signup validation
- ✅ User login authentication
- ✅ JWT token generation and verification
- ✅ Password hashing and comparison
- ✅ Profile update functionality
- ✅ Password change functionality
- ✅ Admin user management
- ✅ Role-based access control

#### Run Tests with Coverage

```bash
npm test -- --coverage
```

**Expected Output:**
```
Test Suites: 6 passed, 6 total
Tests:       20 passed, 20 total
Snapshots:   0 total
Time:        5.234 s
```

### Manual Testing

#### Using Postman

1. Import the API collection
2. Set environment variables:
   - `base_url`: `http://localhost:5000/api`
   - `token`: (will be set after login)

3. Test flow:
   - Signup → Login → Get User → Update Profile → Change Password

#### Test Accounts

**Admin Account:**
```
Email: admin@example.com
Password: Admin@123
```

**Regular User:**
```
Email: user@example.com
Password: User@123
```

---

## 🚢 Deployment

### Backend Deployment (Render)

1. **Create Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect your repository
   - Select `backend` folder as root directory

3. **Configuration**
   ```
   Name: user-management-backend
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Environment Variables**
   Add all variables from `.env`:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `JWT_EXPIRE`
   - `FRONTEND_URL`
   - `NODE_ENV=production`

5. **Deploy**
   - Click "Create Web Service"
   - Note your backend URL: `https://your-app.onrender.com`

### Frontend Deployment (Vercel)

1. **Create Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New..." → "Project"
   - Select your repository
   - Framework Preset: Vite
   - Root Directory: `frontend`

3. **Environment Variables**
   ```
   VITE_API_URL=https://your-backend.onrender.com/api
   ```

4. **Deploy**
   - Click "Deploy"
   - Your app will be live at `https://your-app.vercel.app`

### Post-Deployment

1. **Update CORS**
   Update `FRONTEND_URL` in backend `.env` to your Vercel URL

2. **Test Production**
   - Test all authentication flows
   - Verify admin functionalities
   - Check responsive design

3. **Monitor**
   - Check Render logs for backend errors
   - Use Vercel analytics for frontend performance

---

## 📁 Project Structure

```
user-management-system/
├── backend/
│   ├── server.js                 # Main server file
│   ├── package.json              # Backend dependencies
│   ├── .env                      # Environment variables
│   ├── .gitignore               # Git ignore file
│   ├── models/
│   │   └── User.js              # User model schema
│   ├── middleware/
│   │   ├── auth.js              # Authentication middleware
│   │   
│   ├── routes/
│   │   ├── auth.js              # Auth routes
│   │   └── users.js             # User routes
│   ├── controllers/
│   │   ├── authController.js    # Auth logic
│   │   └── userController.js    # User management logic
│   ├── utils/
│   │   ├── validators.js        # Input validation helpers
│   │   
│   └── tests/
│       ├── auth.test.js         # Auth tests
│       
│
├── frontend/
│   ├── public/
│   │   └── favicon.ico          # App icon
│   ├── src/
│   │   ├── App.jsx              # Main app component
│   │   ├── main.jsx             # Entry point
│   │   ├── index.css            # Global styles
│   │   ├── api/
│   │   │   └── index.js         # API client
│   │   ├── components/
│   │   │   ├── Input.jsx        # Input component
│   │   │   ├── Button.jsx       # Button component
│   │   │   ├── Modal.jsx        # Modal component
│   │   │   ├── Toast.jsx        # Toast notification
│   │   │   ├── Loading.jsx      # Loading spinner
│   │   │   ├── Badge.jsx        # Badge component
│   │   │   ├── Card.jsx         # Card component
│   │   │   ├── Table.jsx        # Table component
│   │   │   └── Pagination.jsx   # Pagination component
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx    # Login page
│   │   │   ├── SignupPage.jsx   # Signup page
│   │   │   ├── AdminDashboard.jsx  # Admin dashboard
│   │   │   └── UserProfile.jsx  # User profile page
│   │   ├── context/
│   │   │   └── AuthContext.jsx  # Auth context provider
│   │   └── utils/
│   │       ├── validation.js    # Client-side validation
│   │       └── helpers.js       # Helper functions
│   ├── package.json             # Frontend dependencies
│   ├── vite.config.js           # Vite configuration
│   ├── tailwind.config.js       # Tailwind configuration
│   ├── postcss.config.js        # PostCSS configuration
│   └── .env                     # Frontend environment variables
│
├── README.md                    # This file
├── LICENSE                      # MIT License
└── .gitignore                   # Root gitignore
```

---

## 🔒 Security Features

### Password Security
- ✅ Bcrypt hashing with 10 salt rounds
- ✅ Password strength requirements (8+ chars, upper, lower, number)
- ✅ Secure password change flow
- ✅ No plain text password storage

### Authentication
- ✅ JWT tokens with 24-hour expiration
- ✅ Token verification on protected routes
- ✅ HTTP-only cookie support (optional)
- ✅ Automatic token cleanup on logout

### Authorization
- ✅ Role-based access control (RBAC)
- ✅ Admin-only route protection
- ✅ User can only edit own profile
- ✅ Middleware-based authorization

### Input Validation
- ✅ Email format validation (regex)
- ✅ Required field validation
- ✅ SQL injection prevention (Mongoose)
- ✅ XSS protection (sanitization)
- ✅ Rate limiting (recommended for production)

### Environment Security
- ✅ Sensitive data in `.env` files
- ✅ `.env` excluded from version control
- ✅ CORS configuration for specific origins
- ✅ MongoDB connection string encryption

### Best Practices
- ✅ HTTPS in production
- ✅ Regular dependency updates
- ✅ MongoDB IP whitelisting
- ✅ Error messages don't leak sensitive info
- ✅ Audit logging (recommended)

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Development Workflow

1. **Fork the repository**
   ```bash
   git clone https://github.com/dexter-ifti/purple-merit-assignment.git
   cd purple-merit-assignment
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow existing code style
   - Add tests for new features
   - Update documentation

4. **Test your changes**
   ```bash
   npm test
   ```

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create Pull Request**
   - Go to GitHub
   - Click "New Pull Request"
   - Describe your changes

### Commit Message Convention

```
feat: add new feature
fix: resolve bug
docs: update documentation
style: format code
refactor: restructure code
test: add tests
chore: update dependencies
```

### Code Style

- **JavaScript**: Use ES6+ features
- **React**: Use functional components with hooks
- **CSS**: Use Tailwind utility classes
- **Naming**: camelCase for variables, PascalCase for components
- **Comments**: Write clear, concise comments

### Pull Request Checklist

- [ ] Code follows project style guidelines
- [ ] Tests added for new features
- [ ] All tests passing
- [ ] Documentation updated
- [ ] Commit messages follow convention
- [ ] No console.log statements
- [ ] Branch is up to date with main

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👥 Authors

- **Taha Iftikhar** - *Initial work* - [GitHub](https://github.com/dexter-ifti)

See also the list of [contributors](https://github.com/dexter-ifti/purple-merit-assignment/contributors) who participated in this project.

---

## 🙏 Acknowledgments

- **Purple Merit Technologies** - Project requirements and specifications
- **MongoDB** - Database hosting and documentation
- **Vercel & Render** - Deployment platforms
- **Tailwind CSS** - Beautiful UI framework
- **Lucide Icons** - Icon library
- **React Community** - Excellent documentation and support

---

## 📞 Support

### Documentation
- [API Documentation](docs/API.md)
- [Design System](docs/DESIGN_SYSTEM.md)
- [Architecture Overview](docs/ARCHITECTURE.md)

### Resources
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [JWT Documentation](https://jwt.io/)

---


## 📝 Notes

### For Developers
- Always test changes locally before pushing
- Keep dependencies up to date
- Write meaningful commit messages
- Document new features
- Follow the established code style

### For Users
- Report bugs through GitHub issues
- Suggest features in discussions
- Read documentation before asking questions
- Keep your account secure
- Backup important data

---
**Built with ❤️ for Purple Merit Technologies Assessment**

---

*Last Updated: December 31, 2024*