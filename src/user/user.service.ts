import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from '../users/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UserService {
  constructor(
    @Inject('USERS_REPOSITORY') private userRepository: typeof User,
    private rolesService: RolesService,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const role = await this.rolesService.getRoleByValue('USER');
    if (!role) {
      throw new HttpException('Роль не найдена', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userRepository.create(dto);
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async getUserByEmail(email: string) {
    return await this.userRepository /*.scope('withoutPassword')*/
      .findOne({
        where: { email },
        include: { all: true },
      });
  }
}
