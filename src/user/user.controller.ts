import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserService } from './user.service';
import { RolesGuard } from '../guards/roles.guard';
import { AuthUser } from './auth-user.decorator';
import { User } from '../users/user.entity';

@Controller('user')
export class UserController {
  constructor(private usersService: UserService) {}

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.create(userDto);
  }

  @SetMetadata('roles', ['USER', 'ADMIN'])
  @UseGuards(RolesGuard)
  @Get()
  async getUser(@AuthUser() user: User) {
    if (user && user.email) {
      return await this.usersService.getUserByEmail(user.email);
    }
    throw new HttpException('Необходим повторный вход', HttpStatus.BAD_REQUEST);
  }
}
