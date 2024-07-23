import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private _prismaService: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this._prismaService.user.create({ data: createUserDto });
  }

  findAll() {
    return this._prismaService.user.findMany({ where: {} });
  }

  findOne(id: number) {
    return this._prismaService.user.findUnique({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this._prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this._prismaService.user.delete({ where: { id } });
  }
}
