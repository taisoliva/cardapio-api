import { HttpException, HttpStatus } from '@nestjs/common';

export class MenuNotFoundException extends HttpException {
  constructor(menuId: string) {
    super(`Menu ${menuId} not found`, HttpStatus.NOT_FOUND);
  }
}
