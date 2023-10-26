import { BadRequestException } from '@nestjs/common';

export default function verifyLengthOfID(id: string) {
  if (id.length !== 24) {
    throw new BadRequestException('ID incorrect');
  }
}
