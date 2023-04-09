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
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

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
    return userData;
  }

  @UseGuards(JwtGuard)
  @Patch('me')
  async updateUser(
    @Req() { user }: { user: User },
    @Body() dto: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.updateById(user.id, dto);
  }
}
