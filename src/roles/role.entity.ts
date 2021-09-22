import { Table, Column, Model, BelongsToMany } from 'sequelize-typescript';
import { User } from '../users/user.entity';
import { UserRoles } from './user-roles.entity';

@Table
export class Role extends Model {
  @Column({ unique: 'value' })
  value: string;

  @Column({})
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
