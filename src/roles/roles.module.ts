import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from './role.entity';
import { UserRoles } from './user-roles.entity';
import { rolesProviders } from './roles.providers';
import { RolesController } from './roles.controller';

@Module({
  controllers: [RolesController],
  providers: [...rolesProviders, RolesService, Role, UserRoles],
  exports: [RolesService],
})
export class RolesModule {}
