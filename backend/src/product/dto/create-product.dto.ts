import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsNumber()
  stock: number;
}
