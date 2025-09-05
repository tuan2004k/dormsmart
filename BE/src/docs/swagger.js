import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Auth API',
            version: '1.0.0',
            description: 'Chao mung ban đến với trải nghiệm',
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string', format: 'ObjectId' },
                        username: { type: 'string' },
                        email: { type: 'string', format: 'email' },
                        role: { type: 'string', enum: ['STUDENT', 'ADMIN', 'STAFF'] },
                        profile: {
                            type: 'object',
                            properties: {
                                fullName: { type: 'string' },
                                phone: { type: 'string' },
                                avatar: { type: 'string' },
                            },
                        },
                        password: { type: 'string', format: 'password' },
                        isActive: { type: 'boolean' },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' },
                    },
                },
                Student: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string', format: 'ObjectId' },
                        userId: { type: 'string', format: 'ObjectId' },
                        studentId: { type: 'string' },
                        personalInfo: {
                            type: 'object',
                            properties: {
                                fullName: { type: 'string' },
                                dateOfBirth: { type: 'string', format: 'date' },
                                gender: { type: 'string', enum: ['Male', 'Female', 'Other'] },
                                phone: { type: 'string' },
                                email: { type: 'string', format: 'email' },
                                idCard: { type: 'string' },
                                address: { type: 'string' },
                            },
                        },
                        academicInfo: {
                            type: 'object',
                            properties: {
                                university: { type: 'string' },
                                faculty: { type: 'string' },
                                major: { type: 'string' },
                                year: { type: 'number' },
                            },
                        },
                        emergencyContact: {
                            type: 'object',
                            properties: {
                                name: { type: 'string' },
                                relationship: { type: 'string' },
                                phone: { type: 'string' },
                            },
                        },
                        documents: { type: 'array', items: { type: 'string' } },
                        status: { type: 'string', enum: ['active', 'graduated', 'dropped'] },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' },
                    },
                },
                Building: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string', format: 'ObjectId' },
                        name: { type: 'string' },
                        code: { type: 'string' },
                        address: { type: 'string' },
                        description: { type: 'string' },
                        facilities: { type: 'array', items: { type: 'string' } },
                        totalFloors: { type: 'number' },
                        totalRooms: { type: 'number' },
                        managerId: { type: 'string', format: 'ObjectId' },
                        status: { type: 'string', enum: ['active', 'maintenance', 'closed'] },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' },
                    },
                },
                Room: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string', format: 'ObjectId' },
                        roomNumber: { type: 'string' },
                        buildingId: { type: 'string', format: 'ObjectId' },
                        floor: { type: 'number' },
                        roomType: { type: 'string', enum: ['2-bed', '4-bed', '6-bed'] },
                        capacity: { type: 'number' },
                        currentOccupancy: { type: 'number' },
                        monthlyRent: { type: 'number' },
                        facilities: { type: 'array', items: { type: 'string' } },
                        status: { type: 'string', enum: ['available', 'occupied', 'maintenance'] },
                        images: { type: 'array', items: { type: 'string' } },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' },
                    },
                },
                Contract: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string', format: 'ObjectId' },
                        contractNumber: { type: 'string' },
                        studentId: { type: 'string', format: 'ObjectId' },
                        roomId: { type: 'string', format: 'ObjectId' },
                        startDate: { type: 'string', format: 'date-time' },
                        endDate: { type: 'string', format: 'date-time' },
                        monthlyRent: { type: 'number' },
                        deposit: { type: 'number' },
                        electricityRate: { type: 'number' },
                        waterRate: { type: 'number' },
                        status: { type: 'string', enum: ['draft', 'active', 'expired', 'terminated'] },
                        terms: { type: 'string' },
                        signedAt: { type: 'string', format: 'date-time' },
                        createdBy: { type: 'string', format: 'ObjectId' },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' },
                    },
                },
                Payment: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string', format: 'ObjectId' },
                        contractId: { type: 'string', format: 'ObjectId' },
                        studentId: { type: 'string', format: 'ObjectId' },
                        paymentType: { type: 'string', enum: ['rent', 'deposit', 'electricity', 'water'] },
                        amount: { type: 'number' },
                        dueDate: { type: 'string', format: 'date-time' },
                        paidDate: { type: 'string', format: 'date-time' },
                        paymentMethod: { type: 'string', enum: ['cash', 'transfer', 'online'] },
                        status: { type: 'string', enum: ['pending', 'paid', 'overdue', 'cancelled'] },
                        invoiceNumber: { type: 'string' },
                        note: { type: 'string' },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' },
                    },
                },
                Request: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string', format: 'ObjectId' },
                        requestNumber: { type: 'string' },
                        studentId: { type: 'string', format: 'ObjectId' },
                        roomId: { type: 'string', format: 'ObjectId' },
                        type: { type: 'string', enum: ['maintenance', 'room_change', 'complaint', 'other'] },
                        title: { type: 'string' },
                        description: { type: 'string' },
                        priority: { type: 'string', enum: ['low', 'medium', 'high', 'urgent'] },
                        status: { type: 'string', enum: ['pending', 'in_progress', 'resolved', 'rejected'] },
                        attachments: { type: 'array', items: { type: 'string' } },
                        assignedTo: { type: 'string', format: 'ObjectId' },
                        resolvedAt: { type: 'string', format: 'date-time' },
                        feedback: {
                            type: 'object',
                            properties: {
                                rating: { type: 'number', minimum: 1, maximum: 5 },
                                comment: { type: 'string' },
                            },
                        },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' },
                    },
                },
            },
        },
    },
    apis: [
      './src/routes/auth.Routes.js',
      './src/routes/student.Routes.js',
      './src/routes/room.Routes.js',
      './src/routes/building.Routes.js',
      './src/routes/contract.Routes.js',
      './src/routes/payment.Routes.js',
      './src/routes/request.Routes.js',
      './src/routes/upload.Routes.js',
      './src/routes/user.Routes.js',
      './src/routes/report.Routes.js', 
    ]
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export { swaggerUi, swaggerDocs };
