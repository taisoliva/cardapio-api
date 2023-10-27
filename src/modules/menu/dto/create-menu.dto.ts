import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateMenuDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['diurno', 'noturno'], { message: 'type must be a diurno or noturno' })
  type: string;
}
