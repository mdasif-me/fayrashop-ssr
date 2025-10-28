import { registerAs } from '@nestjs/config';

/**
 * database configuration
 * - MONGODB_URI: MongoDB connection string
 */
export default registerAs('database', () => ({
  uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/fayrashop',
  options: {
    retryWrites: true,
    w: 'majority',
  },
}));
