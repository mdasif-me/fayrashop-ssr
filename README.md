# FayraShop - Enterprise NestJS Starter

A production-ready, enterprise-level NestJS application with modular architecture, authentication, file uploads, and multi-database support.

## 🚀 Features

### Core Features
- ✅ **Modular Architecture** - Scalable folder structure for large applications
- ✅ **Multi-Database Support** - MongoDB, PostgreSQL, MySQL with easy switching
- ✅ **JWT Authentication** - Secure authentication with access & refresh tokens
- ✅ **Role-Based Access Control (RBAC)** - Fine-grained permission management
- ✅ **Cloudinary Integration** - Cloud-based file upload and management
- ✅ **Global Error Handling** - Custom error codes and standardized responses
- ✅ **Request/Response Interceptors** - Automatic response formatting
- ✅ **Rate Limiting** - Built-in throttling to prevent abuse
- ✅ **Health Checks** - Monitor application and database health
- ✅ **API Documentation** - Auto-generated Swagger/OpenAPI docs
- ✅ **Custom Logger** - Winston-based logging with daily rotation
- ✅ **Pagination Support** - Built-in pagination utilities
- ✅ **Validation** - Class-validator for DTO validation
- ✅ **Environment Configuration** - Type-safe configuration management

## 📁 Project Structure

```
fayrashop/
├── src/
│   ├── common/                    # Shared utilities and decorators
│   │   ├── decorators/
│   │   ├── interceptors/
│   │   └── utils/
│   ├── config/                    # Configuration files
│   │   ├── app.config.ts
│   │   ├── database.config.ts
│   │   └── cloudinary.config.ts
│   ├── database/                  # Database module
│   │   └── database.module.ts
│   ├── errors/                    # Error handling
│   │   ├── errors.filter.ts
│   │   └── custom/
│   ├── logger/                    # Logging service
│   │   └── logger.service.ts
│   ├── modules/                   # Feature modules
│   │   ├── auth/                  # Authentication & authorization
│   │   │   ├── decorators/
│   │   │   ├── dto/
│   │   │   ├── guards/
│   │   │   ├── strategies/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   └── auth.module.ts
│   │   ├── users/                 # User management
│   │   │   ├── schemas/
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   └── users.module.ts
│   │   ├── roles/                 # Role management
│   │   │   ├── schemas/
│   │   │   ├── roles.controller.ts
│   │   │   ├── roles.service.ts
│   │   │   └── roles.module.ts
│   │   ├── upload/                # File upload with Cloudinary
│   │   │   ├── providers/
│   │   │   ├── upload.controller.ts
│   │   │   ├── upload.service.ts
│   │   │   └── upload.module.ts
│   │   └── health/                # Health checks
│   │       ├── health.controller.ts
│   │       └── health.module.ts
│   ├── root/                      # Root endpoints
│   │   ├── app.controller.ts
│   │   └── app.service.ts
│   ├── templates/                 # HTML templates
│   │   └── server-status.html
│   ├── app.module.ts              # Main application module
│   └── main.ts                    # Application entry point
├── test/                          # E2E tests
├── logs/                          # Application logs
├── .env.example                   # Environment variables template
├── package.json
├── tsconfig.json
└── README.md
```

## 🛠️ Installation

### Prerequisites
- Node.js (v18 or higher)
- pnpm, npm, or yarn
- MongoDB, PostgreSQL, or MySQL (depending on your choice)
- Cloudinary account (for file uploads)

### Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd fayrashop
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Configure your .env file**
   - Set your database connection (MongoDB, PostgreSQL, or MySQL)
   - Add Cloudinary credentials
   - Update JWT secrets (use strong, random strings)

5. **Start the application**
   ```bash
   # Development mode
   pnpm start:dev

   # Production build
   pnpm build
   pnpm start:prod
   ```

## 🗄️ Database Configuration

This starter supports multiple databases. Choose one and configure accordingly:

### Option 1: MongoDB (Default)
```env
DATABASE_TYPE=mongodb
MONGODB_URI=mongodb://localhost:27017/fayrashop
```

### Option 2: PostgreSQL
```env
DATABASE_TYPE=postgres
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DATABASE=fayrashop
POSTGRES_SYNCHRONIZE=true
```

### Option 3: MySQL
```env
DATABASE_TYPE=mysql
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=root
MYSQL_DATABASE=fayrashop
MYSQL_SYNCHRONIZE=true
```

## 🔐 Authentication & Authorization

### Register a New User
```bash
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "Password123!",
  "firstName": "John",
  "lastName": "Doe"
}
```

### Login
```bash
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "Password123!"
}
```

### Protected Routes
Use the `@Public()` decorator to make routes public. All other routes require JWT authentication by default.

### Role-Based Access
```typescript
@Roles('admin')
@Get('admin-only')
getAdminData() {
  return 'Admin data';
}
```

## 📤 File Upload with Cloudinary

### Setup Cloudinary
1. Create account at [cloudinary.com](https://cloudinary.com)
2. Get your credentials from dashboard
3. Add to `.env`:
   ```env
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

### Upload Single File
```bash
POST /api/v1/upload/single
Content-Type: multipart/form-data

file: [binary]
folder: "products" (optional)
```

### Upload Multiple Files
```bash
POST /api/v1/upload/multiple
Content-Type: multipart/form-data

files: [binary array]
folder: "products" (optional)
```

## 📚 API Documentation

Access Swagger documentation at:
```
http://localhost:3000/api/docs
```

## 🔧 Available Scripts

```bash
# Development
pnpm start:dev          # Start in watch mode

# Production
pnpm build              # Build the application
pnpm start:prod         # Start production server

# Testing
pnpm test               # Run unit tests
pnpm test:e2e           # Run e2e tests
pnpm test:cov           # Generate coverage report

# Code Quality
pnpm lint               # Run ESLint
pnpm format             # Format code with Prettier
```

## 🏗️ Creating New Modules

To add a new feature module:

1. Create module structure:
   ```bash
   src/modules/your-module/
   ├── dto/
   ├── schemas/ or entities/
   ├── your-module.controller.ts
   ├── your-module.service.ts
   └── your-module.module.ts
   ```

2. Import in `app.module.ts`:
   ```typescript
   import { YourModule } from './modules/your-module/your-module.module';

   @Module({
     imports: [
       // ...
       YourModule,
     ],
   })
   ```

## 🔒 Security Best Practices

1. **Environment Variables**: Never commit `.env` file
2. **JWT Secrets**: Use strong, random strings (min 32 characters)
3. **Password Hashing**: bcrypt with configurable rounds (default: 10)
4. **Rate Limiting**: Configured globally (10 requests per 60 seconds)
5. **CORS**: Configure allowed origins in production
6. **Validation**: All DTOs use class-validator

## 🎯 Production Checklist

- [ ] Update JWT secrets to strong random strings
- [ ] Configure production database
- [ ] Set up Cloudinary account
- [ ] Update CORS origins
- [ ] Configure email service
- [ ] Set up monitoring and logging
- [ ] Enable HTTPS
- [ ] Configure rate limiting
- [ ] Set up database backups
- [ ] Configure environment variables
- [ ] Run security audit (`pnpm audit`)

## 📝 Environment Variables

See `.env.example` for all available configuration options.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the UNLICENSED License.

## 🆘 Support

For issues and questions:
- Create an issue in the repository
- Check existing documentation
- Review API documentation at `/api/docs`

## 🎉 Quick Start Summary

```bash
# 1. Install dependencies
pnpm install

# 2. Copy environment file
cp .env.example .env

# 3. Configure .env with your database and Cloudinary credentials

# 4. Seed default roles (after first run)
POST /api/v1/roles/seed

# 5. Register first user
POST /api/v1/auth/register

# 6. Start developing!
pnpm start:dev
```

Visit `http://localhost:3000` to see the server status page and `http://localhost:3000/api/docs` for API documentation.

---

**Built with ❤️ using NestJS**

