import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Country, Currency } from '../types/user';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ default: '' })
  firstName: string;

  @Column({ default: '' })
  lastName: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  age: number;

  @Column({ default: 'RUB' })
  currency: Currency;

  @Column({ default: '' })
  country: Country;

  @Column({ default: '' })
  city: string;

  @Column({ default: '' })
  avatar: string;
}
