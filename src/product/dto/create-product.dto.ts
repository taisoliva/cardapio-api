import { IsInt, IsNotEmpty, IsString, IsUrl, Length } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  price: number;

  @IsUrl()
  @IsString()
  image: string;

  @IsString()
  description: string;

  @IsString()
  @Length(24, 24)
  menuId: string;

  @IsString()
  categoryId: string;
}
