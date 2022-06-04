import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';
export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  price: number;

  @IsString()
  @Length(1, 1024)
  description: string;

  @IsString()
  @IsUrl()
  @Length(1, 255)
  image: string;

  @IsNumber()
  stock: number;
}
