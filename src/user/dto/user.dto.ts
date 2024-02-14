import { User } from '../entities/user.entity';

export class UserDto {
  id: number;
  username: string;
  firstname: string;
  lastname: string;

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.firstname = user.firstName;
    this.lastname = user.lastName;
  }
}
