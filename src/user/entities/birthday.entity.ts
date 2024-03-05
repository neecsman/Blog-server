import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Birthday {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  day: string;

  @Column({ default: '' })
  month: string;

  @Column({ default: '' })
  year: string;
}
