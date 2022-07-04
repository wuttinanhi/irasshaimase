import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, Length, Min } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  name: string;

  @Column()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  price: number;

  @Column()
  @IsString()
  @Length(1, 1024)
  description: string;

  @Column()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @IsInt()
  stock: number;
}
