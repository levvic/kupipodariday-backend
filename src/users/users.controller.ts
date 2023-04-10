import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { NotFoundException } from '@nestjs/common/exceptions';
import {
  Controller,
  Get,
  Body,
  Patch,
  Req,
  UseGuards,
  Post,
  Param,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { USER_IS_NOT_FOUND } from 'src/utils/constants/user';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getUser(@Req() { user }: { user: User }): Promise<User> {
    const userData = await this.usersService.findById(user.id);

    if (!userData) {
      throw new NotFoundException();
    }
    const { password, ...result } = userData;
    return result;
  }

  @Patch('me')
  async updateUser(
    @Req() { user }: { user: User },
    @Body() dto: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.updateById(user.id, dto);
  }

  @Post('find')
  async findUsers(@Body('query') query: string): Promise<User[]> {
    return await this.usersService.findMany(query);
  }

  @Get(':username')
  async getUserByUsername(@Param('username') username: string): Promise<User> {
    const user = await this.usersService.findByUsername(username);

    if (!user) {
      throw new NotFoundException(USER_IS_NOT_FOUND);
    }

    return user;
  }
}
