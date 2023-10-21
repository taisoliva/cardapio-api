import { HttpException, HttpStatus } from '@nestjs/common';

export class ProductNotFoundException extends HttpException {
  constructor(productId: string) {
    super(`Product of Id ${productId} not found`, HttpStatus.NOT_FOUND);
  }
}
