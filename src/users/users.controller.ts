import { Controller, Get, SetMetadata, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { RolesGuard } from '../guards/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @SetMetadata('roles', ['USER', 'ADMIN'])
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.usersService.getAll();
  }
}
