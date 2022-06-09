import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column()
  imageUrl: string;

  @Column()
  userId: number;

  @Column()
  imageName: string;

  @Column()
  imageSize: number;

  @Column()
  imageMimeType: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
