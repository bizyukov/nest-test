import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { Role } from './role.entity';
import { User } from '../users/user.entity';

@Table
export class UserRoles extends Model {
  @ForeignKey(() => Role)
  @Column({})
  roleId: number;

  @ForeignKey(() => User)
  @Column({})
  userId: string;
}
