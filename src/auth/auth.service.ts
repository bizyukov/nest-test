import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    if (!userDto || !userDto.email || !userDto.password) {
      throw new UnauthorizedException({
        message: 'Не корректный емайл или пароль',
      });
    }
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    if (!userDto) {
      throw new UnauthorizedException({
        message: 'Нет данных для регистрации',
      });
    }
    if (!userDto.email) {
      throw new UnauthorizedException({ message: 'Не корректный емайл' });
    }
    if (!userDto.password) {
      throw new UnauthorizedException({ message: 'Не корректный пароль' });
    }
    if (!userDto.phone) {
      throw new UnauthorizedException({ message: 'Не корректный телефон' });
    }
    if (!userDto.name) {
      throw new UnauthorizedException({ message: 'Не корректное имя' });
    }
    if (!userDto.lastName) {
      throw new UnauthorizedException({ message: 'Не корректный фамилия' });
    }

    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        'Такой пользователь уже есть',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.create({
      ...userDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  private generateToken(user: User) {
    if (!user.roles) {
      throw new UnauthorizedException({ message: 'Нет роли пользователя' });
    }
    const roles = user.roles && user.roles.map((r) => r.value);
    const payload = { email: user.email, id: user.id, role: roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Не корректный емайл или пароль',
    });
  }
}
