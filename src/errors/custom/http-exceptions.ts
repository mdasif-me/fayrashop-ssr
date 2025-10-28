import { HttpException, HttpStatus } from '@nestjs/common';
import { errorMessages } from './index';

/**
 * Custom HTTP Exception with error code support
 */
export class CustomHttpException extends HttpException {
  constructor(message: string, statusCode: HttpStatus, code: string) {
    super({ message, code }, statusCode);
  }
}

/**
 * Authentication & Authorization Exceptions
 */
export class WrongCredentialsException extends CustomHttpException {
  constructor() {
    super(
      errorMessages.auth.wrongCredentials.message,
      HttpStatus.UNAUTHORIZED,
      errorMessages.auth.wrongCredentials.code,
    );
  }
}

export class UserAlreadyExistsException extends CustomHttpException {
  constructor() {
    super(
      errorMessages.auth.userAlreadyExist.message,
      HttpStatus.CONFLICT,
      errorMessages.auth.userAlreadyExist.code,
    );
  }
}

export class ExpiredTokenException extends CustomHttpException {
  constructor() {
    super(
      errorMessages.auth.expiredToken.message,
      HttpStatus.UNAUTHORIZED,
      errorMessages.auth.expiredToken.code,
    );
  }
}

export class InvalidTokenException extends CustomHttpException {
  constructor() {
    super(
      errorMessages.auth.invalidToken.message,
      HttpStatus.UNAUTHORIZED,
      errorMessages.auth.invalidToken.code,
    );
  }
}

export class NotAllowedException extends CustomHttpException {
  constructor() {
    super(
      errorMessages.auth.notAllowed.message,
      HttpStatus.FORBIDDEN,
      errorMessages.auth.notAllowed.code,
    );
  }
}

export class UnauthorizedException extends CustomHttpException {
  constructor() {
    super(
      errorMessages.auth.unauthorized.message,
      HttpStatus.UNAUTHORIZED,
      errorMessages.auth.unauthorized.code,
    );
  }
}

/**
 * User Exceptions
 */
export class UserNotFoundException extends CustomHttpException {
  constructor() {
    super(
      errorMessages.user.notFound.message,
      HttpStatus.NOT_FOUND,
      errorMessages.user.notFound.code,
    );
  }
}

export class InvalidEmailException extends CustomHttpException {
  constructor() {
    super(
      errorMessages.user.invalidEmail.message,
      HttpStatus.BAD_REQUEST,
      errorMessages.user.invalidEmail.code,
    );
  }
}

/**
 * Role Exceptions
 */
export class RoleNotFoundException extends CustomHttpException {
  constructor() {
    super(
      errorMessages.role.notFound.message,
      HttpStatus.NOT_FOUND,
      errorMessages.role.notFound.code,
    );
  }
}

/**
 * Category Exceptions
 */
export class CategoryNotFoundException extends CustomHttpException {
  constructor() {
    super(
      errorMessages.category.notFound.message,
      HttpStatus.NOT_FOUND,
      errorMessages.category.notFound.code,
    );
  }
}

/**
 * Product Exceptions
 */
export class ProductNotFoundException extends CustomHttpException {
  constructor() {
    super(
      errorMessages.product.notFound.message,
      HttpStatus.NOT_FOUND,
      errorMessages.product.notFound.code,
    );
  }
}

export class ProductNotFulfilledException extends CustomHttpException {
  constructor() {
    super(
      errorMessages.product.notFulfilled.message,
      HttpStatus.BAD_REQUEST,
      errorMessages.product.notFulfilled.code,
    );
  }
}

export class ProductOutOfStockException extends CustomHttpException {
  constructor() {
    super(
      errorMessages.product.outOfStock.message,
      HttpStatus.BAD_REQUEST,
      errorMessages.product.outOfStock.code,
    );
  }
}

export class InvalidPriceException extends CustomHttpException {
  constructor() {
    super(
      errorMessages.product.invalidPrice.message,
      HttpStatus.BAD_REQUEST,
      errorMessages.product.invalidPrice.code,
    );
  }
}

/**
 * Order Exceptions
 */
export class OrderNotFoundException extends CustomHttpException {
  constructor() {
    super(
      errorMessages.order.notFound.message,
      HttpStatus.NOT_FOUND,
      errorMessages.order.notFound.code,
    );
  }
}

export class InvalidOrderStatusException extends CustomHttpException {
  constructor() {
    super(
      errorMessages.order.invalidStatus.message,
      HttpStatus.BAD_REQUEST,
      errorMessages.order.invalidStatus.code,
    );
  }
}

export class CannotCancelOrderException extends CustomHttpException {
  constructor() {
    super(
      errorMessages.order.cannotCancel.message,
      HttpStatus.BAD_REQUEST,
      errorMessages.order.cannotCancel.code,
    );
  }
}

/**
 * Validation Exceptions
 */
export class InvalidInputException extends CustomHttpException {
  constructor(message?: string) {
    super(
      message || errorMessages.validation.invalidInput.message,
      HttpStatus.BAD_REQUEST,
      errorMessages.validation.invalidInput.code,
    );
  }
}

export class MissingFieldException extends CustomHttpException {
  constructor(fieldName?: string) {
    const message = fieldName
      ? `Required field '${fieldName}' is missing`
      : errorMessages.validation.missingField.message;
    super(
      message,
      HttpStatus.BAD_REQUEST,
      errorMessages.validation.missingField.code,
    );
  }
}

/**
 * Global Exceptions
 */
export class ResourceNotFoundException extends CustomHttpException {
  constructor(resource?: string) {
    const message = resource
      ? `${resource} not found`
      : errorMessages.global.notFound.message;
    super(message, HttpStatus.NOT_FOUND, errorMessages.global.notFound.code);
  }
}

export class BadRequestException extends CustomHttpException {
  constructor(message?: string) {
    super(
      message || errorMessages.global.badRequest.message,
      HttpStatus.BAD_REQUEST,
      errorMessages.global.badRequest.code,
    );
  }
}
