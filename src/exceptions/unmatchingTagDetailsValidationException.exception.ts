import { HttpException, HttpStatus } from '@nestjs/common';

export class UnmatchingTagDetailsValidationException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
