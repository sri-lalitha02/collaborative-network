const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Collaborative Network API",
      version: "1.0.0",
      description:
        "Full API Docs with Auth, Team, Project, Task, Collaboration, Notification, Dashboard"
    },

    servers: [
      {
        url: process.env.BASE_URL || "http://localhost:5000"
      }
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },

      schemas: {
        // ================= AUTH =================

        User: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: { type: "string", example: "John Doe" },
            email: { type: "string", example: "john@gmail.com" },
            password: { type: "string", example: "123456" }
          }
        },

        Login: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", example: "john@gmail.com" },
            password: { type: "string", example: "123456" }
          }
        },

        AuthResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "Login successful" },
            token: { type: "string", example: "eyJhbGciOiJIUzI1NiIs..." },
            user: {
              type: "object",
              properties: {
                _id: { type: "string", example: "64f1c2a9b1d2e3f4a5b6c7d8" },
                name: { type: "string", example: "John Doe" },
                email: { type: "string", example: "john@gmail.com" }
              }
            }
          }
        },

        // ================= TEAM =================

        TeamCreateRequest: {
          type: "object",
          required: ["name"],
          properties: {
            name: { type: "string", example: "Dev Team" },
            description: { type: "string", example: "Backend developers team" }
          }
        },

        TeamResponse: {
          type: "object",
          properties: {
            _id: { type: "string", example: "65aaa111bbb222ccc333ddd4" },
            name: { type: "string", example: "Dev Team" },
            description: { type: "string", example: "Backend developers team" },
            createdBy: { type: "string", example: "64f1c2a9b1d2e3f4a5b6c7d8" },
            members: {
              type: "array",
              items: { type: "string", example: "64f1c2a9b1d2e3f4a5b6c7d9" }
            },
            createdAt: { type: "string", example: "2026-05-31T10:00:00Z" }
          }
        },

        JoinTeamRequest: {
          type: "object",
          required: ["userId"],
          properties: {
            userId: { type: "string", example: "64f1c2a9b1d2e3f4a5b6c7d9" }
          }
        },

        LeaveTeamRequest: {
          type: "object",
          required: ["userId"],
          properties: {
            userId: { type: "string", example: "64f1c2a9b1d2e3f4a5b6c7d9" }
          }
        },

        JoinLeaveResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "User joined/left team successfully"
            },
            team: {
              type: "object",
              properties: {
                _id: { type: "string", example: "65aaa111bbb222ccc333ddd4" },
                name: { type: "string", example: "Dev Team" },
                members: {
                  type: "array",
                  items: { type: "string", example: "64f1c2a9b1d2e3f4a5b6c7d9" }
                }
              }
            }
          }
        },

        // ================= PROJECT =================

        ProjectCreateRequest: {
          type: "object",
          required: ["name"],
          properties: {
            name: {
              type: "string",
              example: "Task Management System"
            },
            description: {
              type: "string",
              example: "Backend project"
            },
            teamId: {
              type: "string",
              example: "65aaa111bbb222ccc333ddd4"
            }
          }
        },

        ProjectResponse: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "66bbb222ccc333ddd444eee5"
            },
            name: {
              type: "string",
              example: "Task Management System"
            },
            description: {
              type: "string",
              example: "Backend project"
            },
            status: {
              type: "string",
              example: "Active"
            },
            teamId: {
              type: "string",
              example: "65aaa111bbb222ccc333ddd4"
            },
            createdBy: {
              type: "string",
              example: "64f1c2a9b1d2e3f4a5b6c7d8"
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2026-05-31T10:00:00Z"
            }
          }
        },

        UpdateProjectRequest: {
          type: "object",
          properties: {
            title: { type: "string", example: "Updated Project" },
            description: { type: "string", example: "Updated description" },
            status: { type: "string", example: "Completed" }
          }
        },

        // ================= TASK =================

        TaskCreateRequest: {
          type: "object",
          required: ["title"],
          properties: {
            title: { type: "string", example: "Build API" },
            description: { type: "string", example: "Create backend APIs" },
            project: { type: "string", example: "66bbb222ccc333ddd444eee5" },
            assignedTo: { type: "string", example: "64f1c2a9b1d2e3f4a5b6c7d9" }
          }
        },

        AddMemberRequest: {
          type: "object",
          required: ["userId"],
          properties: {
            userId: {
              type: "string",
              example: "64f1c2a9b1d2e3f4a5b6c7d9"
            }
          }
        },

        TaskResponse: {
          type: "object",
          properties: {
            _id: { type: "string", example: "77ccc333ddd444eee555fff6" },
            title: { type: "string", example: "Build API" },
            description: { type: "string", example: "Create backend APIs" },
            status: { type: "string", example: "pending" },
            project: { type: "string", example: "66bbb222ccc333ddd444eee5" },
            assignedTo: { type: "string", example: "64f1c2a9b1d2e3f4a5b6c7d9" },
            createdAt: { type: "string", example: "2026-05-31T10:00:00Z" }
          }
        },

        TaskStatusUpdateRequest: {
          type: "object",
          required: ["status"],
          properties: {
            status: {
              type: "string",
              enum: ["pending", "in-progress", "completed"],
              example: "completed"
            }
          }
        },

        // ================= DASHBOARD =================

        DashboardResponse: {
          type: "object",
          properties: {
            totalProjects: { type: "number", example: 10 },
            totalTasks: { type: "number", example: 50 },
            completedTasks: { type: "number", example: 30 },
            pendingTasks: { type: "number", example: 20 }
          }
        },

        // ================= NOTIFICATION =================

        Notification: {
          type: "object",
          properties: {
            _id: { type: "string", example: "88ddd444eee555fff666ggg7" },
            recipient: { type: "string", example: "64f1c2a9b1d2e3f4a5b6c7d8" },
            type: {
              type: "string",
              enum: [
                "TEAM_INVITE",
                "PROJECT_ASSIGN",
                "TASK_ASSIGN",
                "COLLAB_REQUEST",
                "SYSTEM"
              ],
              example: "TASK_ASSIGN"
            },
            title: { type: "string", example: "New Task Assigned" },
            message: { type: "string", example: "You have been assigned a task" },
            relatedId: { type: "string", example: "77ccc333ddd444eee555fff6" },
            isRead: { type: "boolean", example: false },
            createdAt: { type: "string", example: "2026-05-31T10:00:00Z" }
          }
        },

        NotificationList: {
          type: "array",
          items: {
            $ref: "#/components/schemas/Notification"
          }
        },

        MarkAsReadResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Notification marked as read"
            }
          }
        },

        DeleteNotificationResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Notification deleted successfully"
            }
          }
        },

        // ================= COLLABORATION =================

        CollaborationRequest: {
          type: "object",
          required: ["receiverId"],
          properties: {
            receiverId: {
              type: "string",
              example: "64f1c2a9b1d2e3f4a5b6c7d9"
            },
            message: {
              type: "string",
              example: "Let's work together on this project"
            }
          }
        },

        CollaborationResponse: {
          type: "object",
          properties: {
            _id: { type: "string", example: "99aaa888bbb777ccc666ddd" },
            sender: { type: "string", example: "userA123" },
            receiver: { type: "string", example: "userB456" },
            status: {
              type: "string",
              enum: ["Pending", "Accepted", "Rejected"],
              example: "Pending"
            },
            createdAt: { type: "string", example: "2026-05-31T10:00:00Z" }
          }
        },

        TaskListResponse: {
          type: "array",
          items: {
            $ref: "#/components/schemas/TaskResponse"
          }
        },

        SendOTPRequest: {
          type: "object",
          required: ["email"],
          properties: {
            email: { type: "string", example: "john@gmail.com" }
          }
        },

        VerifyOTPRequest: {
          type: "object",
          required: ["email", "otp"],
          properties: {
            email: { type: "string", example: "john@gmail.com" },
            otp: { type: "string", example: "123456" }
          }
        },

        ChangePasswordRequest: {
          type: "object",
          required: ["oldPassword", "newPassword"],
          properties: {
            oldPassword: { type: "string", example: "oldPassword123" },
            newPassword: { type: "string", example: "newPassword123" }
          }
        }
      }
    },

    security: [
      {
        bearerAuth: []
      }
    ]
  },

  apis: ["./routes/*.js"]
};

module.exports = swaggerJSDoc(options);