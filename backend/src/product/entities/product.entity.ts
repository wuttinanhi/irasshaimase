import { IsNotEmpty, IsNumber, IsPositive, IsString, Length } from 'class-validator';
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
  stock: number;
}
