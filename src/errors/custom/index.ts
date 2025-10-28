export interface ErrorBody extends Error {
  code: string;
}

export const errorMessages = {
  auth: {
    wrongCredentials: {
      message: 'Wrong credentials provided',
      code: '60001',
    },
    userAlreadyExist: {
      message: 'User already exists',
      code: '60002',
    },
    expiredToken: {
      message: 'Token has expired',
      code: '60003',
    },
    invalidToken: {
      message: 'Invalid token provided',
      code: '60004',
    },
    notAllowed: {
      message: 'Access not allowed',
      code: '60005',
    },
    unauthorized: {
      message: 'Unauthorized access',
      code: '60006',
    },
  },
  user: {
    notFound: {
      message: 'User not found',
      code: '60101',
    },
    alreadyExists: {
      message: 'User already exists',
      code: '60102',
    },
    invalidEmail: {
      message: 'Invalid email format',
      code: '60103',
    },
  },
  role: {
    notFound: {
      message: 'Role not found',
      code: '60201',
    },
    alreadyExists: {
      message: 'Role already exists',
      code: '60202',
    },
  },
  category: {
    notFound: {
      message: 'Category not found',
      code: '60301',
    },
    alreadyExists: {
      message: 'Category already exists',
      code: '60302',
    },
  },
  product: {
    notFound: {
      message: 'Product not found',
      code: '60401',
    },
    notFulfilled: {
      message: 'Not all product information is fulfilled',
      code: '60402',
    },
    outOfStock: {
      message: 'Product is out of stock',
      code: '60403',
    },
    invalidPrice: {
      message: 'Invalid product price',
      code: '60404',
    },
  },
  order: {
    notFound: {
      message: 'Order not found',
      code: '60501',
    },
    invalidStatus: {
      message: 'Invalid order status',
      code: '60502',
    },
    cannotCancel: {
      message: 'Order cannot be cancelled',
      code: '60503',
    },
  },
  validation: {
    invalidInput: {
      message: 'Invalid input provided',
      code: '60601',
    },
    missingField: {
      message: 'Required field is missing',
      code: '60602',
    },
  },
  global: {
    internalError: {
      message: 'Something went wrong',
      code: '70000',
    },
    notFound: {
      message: 'Resource not found',
      code: '70001',
    },
    badRequest: {
      message: 'Bad request',
      code: '70002',
    },
  },
};

// Export all custom HTTP exceptions
export * from './http-exceptions';

