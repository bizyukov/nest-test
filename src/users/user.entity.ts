import { Table, Column, Model, BelongsToMany } from 'sequelize-typescript';
import { Role } from '../roles/role.entity';
import { UserRoles } from '../roles/user-roles.entity';
import { DataTypes } from 'sequelize';

@Table
export class User extends Model {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  middleName: string;

  @Column({ unique: 'phone', type: DataTypes.BIGINT({ length: 11 }) })
  phone: number;

  @Column({ unique: 'email' })
  email: string;

  @Column
  password: string;

  @Column
  banned: boolean;

  @Column
  banReason: string;

  @Column
  dateOfBirth: Date;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  scopes: {
    withoutPassword: {
      attributes: { exclude: ['password'] };
    };
  };
}
