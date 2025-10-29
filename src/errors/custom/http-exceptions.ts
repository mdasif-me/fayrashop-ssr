import { HttpException, HttpStatus } from '@nestjs/common';
import { errorMessages } from './index';
/**
 * Custom HTTP exception classes
 * These are utility classes that will be used throughout the application
 * eslint-disable-next-line @typescript-eslint/no-unused-vars
 */

/**
 * HTTP exception base class
 * @extends HttpException
 * @param message - Error message
 * @param statusCode - HTTP status code
 * @param code - Custom error code
 */
export class CustomHttpException extends HttpException {
  constructor(message: string, statusCode: HttpStatus, code: string) {
    super({ message, code }, statusCode);
  }
}

export class InvalidInputException extends CustomHttpException {
  constructor(message?: string) {
    super(
      message || errorMessages.global.invalidInput.message,
      HttpStatus.BAD_REQUEST,
      errorMessages.global.invalidInput.code,
    );
  }
}

// export class MissingFieldException extends CustomHttpException {
//   constructor(fieldName?: string) {
//     const message = fieldName
//       ? `Required field '${fieldName}' is missing`
//       : errorMessages.validation.missingField.message;
//     super(
//       message,
//       HttpStatus.BAD_REQUEST,
//       errorMessages.validation.missingField.code,
//     );
//   }
// }

export class ResourceNotFoundException extends CustomHttpException {
  constructor(resource?: string) {
    const message = resource
      ? `${resource} not found`
      : errorMessages.global.notFound.message;
    super(message, HttpStatus.NOT_FOUND, errorMessages.global.notFound.code);
  }
}

// export class BadRequestException extends CustomHttpException {
//   constructor(message?: string) {
//     super(
//       message || errorMessages.global.badRequest.message,
//       HttpStatus.BAD_REQUEST,
//       errorMessages.global.badRequest.code,
//     );
//   }
// }

export class ConflictRequestException extends CustomHttpException {
  constructor(message?: string) {
    super(
      message || errorMessages.global.conflict.message,
      HttpStatus.CONFLICT,
      errorMessages.global.conflict.code,
    );
  }
}
