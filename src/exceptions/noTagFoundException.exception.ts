import { HttpException, HttpStatus } from '@nestjs/common';

export class NoTagFoundException extends HttpException {
  constructor(message: string) {
    super('No Tag Found with id: ' + message, HttpStatus.NO_CONTENT);
  }
}
