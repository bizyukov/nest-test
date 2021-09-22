import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { usersProviders } from '../users/users.providers';
import { UserService } from './user.service';
import { User } from '../users/user.entity';
import { UserRoles } from '../roles/user-roles.entity';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UserController],
  providers: [...usersProviders, UserService, User, UserRoles],
  imports: [RolesModule, forwardRef(() => AuthModule)],
  exports: [UserService],
})
export class UserModule {}
