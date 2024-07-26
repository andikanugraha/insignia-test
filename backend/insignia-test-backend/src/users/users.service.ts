import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.findOneByUsername(createUserDto.username);
    if (user) {
      throw new ConflictException('User already exist');
    }

    const saltRounds = parseInt(process.env.SALT_ROUNDS);
    const prismaService = this.prismaService;
    return bcrypt
      .hash(createUserDto.password, saltRounds)
      .then(function (hash) {
        const newUser = {
          username: createUserDto.username,
          password: hash,
          balance: createUserDto.balance,
        };
        return prismaService.user.create({ data: newUser });
      })
      .catch((err) => {
        console.log('error', err.response.message);
        throw new InternalServerErrorException();
      });
  }

  findAll() {
    return this.prismaService.user.findMany({ where: {} });
  }

  findOne(id: number) {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  async findOneByUsername(username: string) {
    return await this.prismaService.user.findUnique({ where: { username } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.prismaService.user.delete({ where: { id } });
  }
}
