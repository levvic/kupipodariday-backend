import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Like, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { HashService } from 'src/hash/hash.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly hashService: HashService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.create(createUserDto);

    return this.usersRepository.save(user);
  }

  findAll() {
    return `This action returns all users`;
  }

  async findByUsername(username: string): Promise<User> {
    return await this.usersRepository.findOneBy({ username });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOneBy({ email });
  }

  async findById(id: number): Promise<User> {
    return await this.usersRepository.findOneBy({ id });
  }

  async updateById(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    //hash password
    if (dto.password) {
      dto.password = await this.hashService.getHashAsync(dto.password);
    }

    const updatedUser: User = {
      ...user,
      password: dto?.password,
      email: dto?.email,
      about: dto?.about,
      username: dto?.username,
      avatar: dto?.avatar,
    };
    await this.usersRepository.update(user.id, updatedUser);

    return await this.findById(id);
  }

  async findMany(query: string): Promise<User[]> {
    const users = await this.usersRepository.find({
      where: [{ email: query }, { username: query }],
    });

    users.forEach((user) => {
      delete user.password;
    });

    return users;
  }

  updateOne(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  removeOne(id: number) {
    return `This action removes a #${id} user`;
  }
}
