import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Country, Currency } from '../types/user';
import { Birthday } from './birthday.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ default: '' })
  firstname: string;

  @Column({ default: '' })
  lastname: string;

  @Column({ nullable: true })
  gender: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: Currency.RUB })
  currency: Currency;

  @Column({ default: Country.Russia })
  country: Country;

  @Column({ default: '' })
  city: string;

  @Column({ default: '' })
  avatar: string;

  @OneToOne(() => Birthday)
  @JoinColumn()
  birthday: Birthday;
}
