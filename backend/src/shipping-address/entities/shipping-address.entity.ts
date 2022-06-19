import { IsBoolean, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, Length, Max } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ShippingAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  firstname: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  lastname: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @Length(1, 15)
  @IsPhoneNumber()
  phoneNumber: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  houseNumber: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  alley: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  lane: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  street: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  subArea: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  district: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  province: string;

  @Column()
  @IsNumber()
  @IsNotEmpty()
  @Max(99999)
  postalCode: number;

  @Column()
  @IsString()
  @Length(0, 255)
  info: string;

  @Column({ type: 'boolean' })
  @IsBoolean()
  @IsNotEmpty()
  default: boolean;

  toHumanReadable() {
    return (
      `${this.firstname} ${this.lastname} ${this.houseNumber} ${this.alley}` +
      `${this.lane} ${this.street} ${this.subArea} ${this.district}` +
      `${this.postalCode} ${this.province}` +
      `${this.phoneNumber} ${this.info}`
    );
  }
}
