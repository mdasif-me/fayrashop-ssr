# FayraShop

[![NestJS](https://img.shields.io/badge/NestJS-v10.0.0-red.svg)](https://nestjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v5.0-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-UNLICENSED-blue.svg)](LICENSE)

A production-ready NestJS starter template with MongoDB, comprehensive error handling, logging, and best practices built-in.

### Core Features
- **MongoDB Integration**: Mongoose with proper configuration
- **Global Error Handling**: Centralized exception filter
- **Request/Response Logging**: Winston logger with daily rotation
- **Response Standardization**: Consistent API response format
- **Pagination Support**: Built-in pagination decorator and utilities
- **Validation**: class-validator with DTO support
- **API Documentation**: Swagger/OpenAPI auto-generated docs
- **Configuration Management**: Environment-based config
- **Base Patterns**: Reusable Repository and Service base classes
- **TypeScript**: Full type safety with strict mode
- **Soft Delete**: Built-in soft delete functionality

### Prerequisites
- Node.js >= 18.x
- MongoDB >= 5.x
- pnpm (recommended) or npm

### Installation

1. **Clone and install dependencies**
   ```bash
   cd fayrashop
   pnpm install
   ```

2. **Setup environment**
   ```bash
   cp .env.example .env
   # Update .env with your MongoDB URI and other settings
   ```

3. **Start MongoDB**
   ```bash
   # Make sure MongoDB is running
   # Default: mongodb://localhost:27017
   ```

4. **Run the application**
   ```bash
   # Development
   pnpm start:dev

   # Production
   pnpm build
   pnpm start:prod
   ```

5. **Access the application**
   - **API Base**: http://localhost:3000/api/v1
   - **Swagger Docs**: http://localhost:3000/api/docs
   - **Health Check**: http://localhost:3000/api/v1/health
   - **Server Status**: http://localhost:3000

### Health & Status
- `GET /` - Beautiful server status page
- `GET /api/v1/health` - Health check endpoint
- `GET /api/v1/api-info` - API information


## Environment Variables
```env
# Application
NODE_ENV=development
PORT=3000
HOST=localhost
CORS_ORIGIN=*

# Database
MONGODB_URI=mongodb://localhost:27017/fayrashop

# JWT (for future auth implementation)
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
```

## API Documentation

Once running, visit http://localhost:3000/api/docs for interactive API documentation.

## Testing

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Test coverage
pnpm test:cov
```

## Project Structure Principles

1. **Modularity**: Each feature is a self-contained module
2. **Layered Architecture**: Controller → Service → Repository
3. **DRY**: Base classes eliminate code duplication
4. **Type Safety**: Full TypeScript with strict mode
5. **Error Handling**: Try-catch in all async operations
6. **Logging**: Contextual logging throughout
7. **Validation**: DTOs with class-validator
8. **Documentation**: Inline comments + Swagger

## Security Features

- ✅ Input validation (class-validator)
- ✅ MongoDB injection prevention
- ✅ CORS configuration
- ✅ Request sanitization
- 🔄 JWT authentication (ready to implement)
- 🔄 Rate limiting (recommended to add)
- 🔄 Helmet (recommended to add)

## Performance

- MongoDB indexes on schemas
- Connection pooling
- Efficient pagination
- Lazy loading with Mongoose

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
This project is licensed under the UNLICENSED License - see the [LICENSE](LICENSE) file for details.

