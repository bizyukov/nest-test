import { Inject, Injectable } from '@nestjs/common';
import { Role } from './role.entity';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @Inject('ROLES_REPOSITORY') private roleRepository: typeof Role,
  ) {}

  async create(dto: CreateRoleDto): Promise<Role> {
    return await this.roleRepository.create(dto);
  }

  async getRoleByValue(value: string) {
    return await this.roleRepository.findOne({ where: { value } });
  }
}
