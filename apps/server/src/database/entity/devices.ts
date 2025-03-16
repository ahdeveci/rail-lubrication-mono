import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Devices {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({ type: 'varchar' }) deviceName: string;

  @Column('decimal', { precision: 9, scale: 6 })
  latitude: number;

  @Column('decimal', { precision: 9, scale: 6 })
  longitude: number;

  @Column({ type: 'varchar' }) macAddress: string;

  @Column({ type: 'varchar' }) ipAddress: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  constructor(partial: Partial<Devices>) {
    Object.assign(this, partial);
  }
}
