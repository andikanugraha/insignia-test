import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransactionsService {
  constructor(private _prismaService: PrismaService) {}

  create(createTransactionDto: CreateTransactionDto) {
    return this._prismaService.transaction.create({
      data: createTransactionDto,
    });
  }

  findAll() {
    return this._prismaService.transaction.findMany({ where: {} });
  }

  findOne(id: number) {
    return this._prismaService.transaction.findUnique({ where: { id } });
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return this._prismaService.transaction.update({
      where: { id },
      data: updateTransactionDto,
    });
  }

  remove(id: number) {
    return this._prismaService.transaction.delete({ where: { id } });
  }
}
