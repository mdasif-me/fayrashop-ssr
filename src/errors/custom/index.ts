export interface ErrorBody extends Error {
  code: string;
}

export const errorMessages = {
  global: {
    internalError: {
      message: 'Something went wrong',
      code: '50000',
    },
    invalidInput: {
      message: 'Invalid input data',
      code: '40000',
    },
    missingField: {
      message: 'Required field is missing',
      code: '40001',
    },
    notFound: {
      message: 'Resource not found',
      code: '40400',
    },
    badRequest: {
      message: 'Bad request',
      code: '40002',
    },
    conflict: {
      message: 'Resource already exists',
      code: '40900',
    },
  },
};
export * from './http-exceptions';
