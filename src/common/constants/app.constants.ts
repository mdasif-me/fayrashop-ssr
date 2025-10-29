/**
 * File upload constants
 */
export const UPLOAD_CONSTANTS = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf'],
  CLOUDINARY_FOLDERS: {
    USERS: 'users',
    PRODUCTS: 'products',
    CATEGORIES: 'categories',
    ORDERS: 'orders',
  },
} as const;

/**
 * Pagination constants
 */
export const PAGINATION_CONSTANTS = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

/**
 * JWT constants
 */
export const JWT_CONSTANTS = {
  ACCESS_TOKEN_EXPIRY: '7d',
  REFRESH_TOKEN_EXPIRY: '30d',
} as const;

/**
 * Bcrypt constants
 */
export const BCRYPT_CONSTANTS = {
  DEFAULT_ROUNDS: 10,
} as const;
/**
 * User role constants
 */
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  MANAGER: 'manager',
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

/**
 * Default role permissions
 */
export const ROLE_PERMISSIONS = {
  ADMIN: ['*'],
  USER: ['read'],
  MANAGER: ['read', 'write', 'update'],
} as const;

/**
 * User status constants
 */
export const USER_STATUS = {
  ACTIVE: true,
  INACTIVE: false,
} as const;

/**
 * Email verification status
 */
export const EMAIL_VERIFICATION_STATUS = {
  VERIFIED: true,
  UNVERIFIED: false,
} as const;
