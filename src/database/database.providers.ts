import { Sequelize } from 'sequelize-typescript';
import { User } from '../users/user.entity';
import { Role } from '../roles/role.entity';
import { UserRoles } from '../roles/user-roles.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.MYSQL_HOST,
        port: Number(process.env.MYSQL_PORT),
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASS,
        database: process.env.MYSQL_NAME,
      });

      sequelize.addModels([User, Role, UserRoles]);
      await sequelize.sync({ alter: true }); // Do NOT use force flag!!!!
      return sequelize;
    },
  },
];
