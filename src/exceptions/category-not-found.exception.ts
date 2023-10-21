import { HttpException, HttpStatus } from '@nestjs/common';

export class CategoryNotFoundException extends HttpException {
  constructor(category: string) {
    super(`Category of Id: ${category} not found`, HttpStatus.NOT_FOUND);
  }
}
