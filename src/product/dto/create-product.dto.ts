import { IsInt, IsString, IsUrl } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsInt()
  price: number;

  @IsUrl()
  @IsString()
  image: string;

  @IsString()
  description: string;

  @IsString()
  menuId: string;

  @IsString()
  categoryId: string;
}
