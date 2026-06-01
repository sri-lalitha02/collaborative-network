# Collaborative Network Backend API 🚀

Version: 1.0.0

A production-ready backend system for **Team Collaboration, Project Management, Task Tracking, Notifications, and Real-Time Communication** built with Node.js, Express.js, MongoDB, JWT Authentication, Socket.IO, and Swagger Documentation.

---

## 📌 FEATURES

* 🔐 JWT Authentication & Authorization
* 👥 Team Management System
* 📁 Project Management
* ✅ Task Assignment & Tracking
* 🔔 Notification Management
* 🤝 Collaboration Requests
* 📊 Dashboard Analytics
* ⚡ Real-Time Communication using Socket.IO
* 🧾 Swagger API Documentation
* 🛡️ Role-Based Access Control (RBAC)
* 🚦 Rate Limiting Middleware
* 📝 Request Logging Middleware
* ❌ Centralized Error Handling
* 📨 OTP Generation Support
* 🚫 JWT Token Blacklisting (Logout Security)

---

## 🧱 TECH STACK

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JWT (JSON Web Token)
* bcryptjs

### Real-Time Communication

* Socket.IO

### API Documentation

* Swagger UI
* swagger-jsdoc
* swagger-ui-express

### Security

* CORS
* JWT Authentication
* Role-Based Access Control
* Rate Limiting
* Token Blacklisting

---

## 📁 PROJECT STRUCTURE

```text
backend/
├── config/
│   ├── db.js
│   └── swagger.js
│
├── controllers/
│   ├── authController.js
│   ├── teamController.js
│   ├── projectController.js
│   ├── taskController.js
│   ├── dashboardController.js
│   ├── notificationController.js
│   └── collaborationController.js
│
├── middleware/
│   ├── authMiddleware.js
│   ├── adminMiddleware.js
│   ├── roleMiddleware.js
│   ├── teamLeaderMiddleware.js
│   ├── projectManagerMiddleware.js
│   ├── taskAssigneeMiddleware.js
│   ├── validateRequestMiddleware.js
│   ├── rateLimiterMiddleware.js
│   ├── loggerMiddleware.js
│   ├── notFoundMiddleware.js
│   ├── errorHandlerMiddleware.js
│   └── asyncHandler.js
│
├── models/
│   ├── User.js
│   ├── Team.js
│   ├── Project.js
│   ├── Task.js
│   ├── Collaboration.js
│   ├── Notification.js
│   └── BlacklistedToken.js
│
├── routes/
│   ├── authRoutes.js
│   ├── teamRoutes.js
│   ├── projectRoutes.js
│   ├── taskRoutes.js
│   ├── dashboardRoutes.js
│   ├── notificationRoutes.js
│   └── collaborationRoutes.js
│
├── sockets/
│   └── socket.js
│
├── utils/
│   ├── activityLogger.js
│   ├── createNotification.js
│   ├── generateOTP.js
│   ├── generateToken.js
│   └── sendResponse.js
│
├── app.js
├── server.js
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

## ⚙️ INSTALLATION

```bash
git clone [https://github.com/sri-lalitha02/collaborative-network]
cd backend
npm install

```
---
## 🔐 ENVIRONMENT VARIABLES

Create a `.env` file inside the backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
BASE_URL=http://localhost:5000
```

---

## ▶️ RUN THE SERVER

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

---

## 📡 BASE URL

http://localhost:5000

---

## 📚 SWAGGER API DOCUMENTATION

http://localhost:5000/api-docs


---
## 👨‍💻 API MODULES

### 🔐 AUTH MODULE

| Method | Endpoint                  |
| ------ | ------------------------- |
| POST   | /api/auth/register        |
| POST   | /api/auth/login           |
| POST   | /api/auth/logout          |
| GET    | /api/auth/profile         |
| PUT    | /api/auth/profile         |
| PUT    | /api/auth/change-password |
| POST   | /api/auth/send-otp        |
| POST   | /api/auth/verify-otp      |

---

### 👥 TEAM MODULE

| Method | Endpoint                    |
| ------ | --------------------------- |
| POST   | /api/team/create            |
| GET    | /api/team/all               |
| GET    | /api/team/:id               |
| PUT    | /api/team/:id               |
| DELETE | /api/team/:id               |
| POST   | /api/team/join/:id          |
| POST   | /api/team/leave/:id         |
| POST   | /api/team/add-member/:id    |
| POST   | /api/team/remove-member/:id |

---

### 📁 PROJECT MODULE

| Method | Endpoint                  |
| ------ | ------------------------- |
| POST   | /api/project/create       |
| GET    | /api/project/all          |
| GET    | /api/project/team/:teamId |
| GET    | /api/project/:id          |
| PUT    | /api/project/:id          |
| DELETE | /api/project/:id          |

---

### ✅ TASK MODULE

| Method | Endpoint              |
| ------ | --------------------- |
| POST   | /api/tasks            |
| GET    | /api/tasks            |
| GET    | /api/tasks/:id        |
| PUT    | /api/tasks/:id        |
| DELETE | /api/tasks/:id        |
| PUT    | /api/tasks/:id/assign |
| PUT    | /api/tasks/:id/status |

---

### 🔔 NOTIFICATION MODULE

| Method | Endpoint                    |
| ------ | --------------------------- |
| GET    | /api/notifications          |
| PUT    | /api/notifications/:id/read |
| DELETE | /api/notifications/:id      |

---

### 🤝 COLLABORATION MODULE

| Method | Endpoint                      |
| ------ | ----------------------------- |
| POST   | /api/collaboration/send       |
| GET    | /api/collaboration/all        |
| GET    | /api/collaboration/pending    |
| PUT    | /api/collaboration/accept/:id |
| PUT    | /api/collaboration/reject/:id |

---

### 📊 DASHBOARD MODULE

| Method | Endpoint                       |
| ------ | ------------------------------ |
| GET    | /api/dashboard/stats           |
| GET    | /api/dashboard/recent-projects |
| GET    | /api/dashboard/activity        |


---

## 🛡️ MIDDLEWARES

### Authentication

* authMiddleware.js

### Authorization

* roleMiddleware.js
* adminMiddleware.js
* teamLeaderMiddleware.js
* projectManagerMiddleware.js
* taskAssigneeMiddleware.js

### Validation

* validateRequestMiddleware.js

### Logging

* loggerMiddleware.js

### Rate Limiting

* rateLimiterMiddleware.js

### Error Handling

* notFoundMiddleware.js
* errorHandlerMiddleware.js

---

## 🗄️ DATABASE MODELS

### User

* Authentication
* Profile Management
* Team Membership

### Team

* Team Creation
* Team Members
* Team Roles

### Project

* Project Information
* Team Association
* Project Status

### Task

* Task Assignment
* Task Status Tracking
* Due Dates

### Collaboration

* Collaboration Requests
* Request Status

### Notification

* User Notifications
* Read/Unread Status

### BlacklistedToken

* Logout Security
* Token Revocation

---

## 🚀 DEPLOYMENT

Example deployment platforms:

* Render
* Railway
* VPS
* AWS EC2
* DigitalOcean


```env
BASE_URL=https://your-domain.com
```

---

## 🧪 TESTING

### Run API Locally

```bash
npm run dev
```

### Open Swagger Docs

```text
http://localhost:5000/api-docs
```

### Test APIs

* Postman
* Swagger UI
* Thunder Client

---

## 📄 LICENSE

ISC License

---

## 👨‍💻 AUTHOR

Sri Lalitha Yelisetti
