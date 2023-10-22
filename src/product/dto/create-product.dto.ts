import { IsInt, IsNotEmpty, IsString, IsUrl, Length } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsInt()
  price: number;

  @IsUrl()
  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @Length(24, 24)
  menuId: string;

  @IsString()
  @Length(24, 24)
  categoryId: string;
}
