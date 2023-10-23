import { InternalServerErrorException } from '@nestjs/common';

export default function verifyLengthOfID(id: string) {
  if (id.length !== 24) {
    throw new InternalServerErrorException('ID incorrect');
  }
}
