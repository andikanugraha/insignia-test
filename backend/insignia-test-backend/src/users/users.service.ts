import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.findOneByUsername(createUserDto.username);
    if (user) {
      throw new ConflictException('Username already exist');
    }

    const saltRounds = parseInt(process.env.SALT_ROUNDS);
    const prismaService = this.prismaService;
    const jwtService = this.jwtService;
    return bcrypt
      .hash(createUserDto.password, saltRounds)
      .then(async function (hash) {
        const newUser = {
          username: createUserDto.username,
          password: hash,
          balance: createUserDto.balance,
        };
        const createUser = await prismaService.user.create({ data: newUser });
        const payload = {
          sub: createUser.id,
          username: createUser.username,
        };
        return {
          token: await jwtService.signAsync(payload),
        };
      })
      .catch((err) => {
        console.error('create user error', err);
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
