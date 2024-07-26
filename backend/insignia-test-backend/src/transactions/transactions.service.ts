import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransactionsService {
  constructor(private prismaService: PrismaService) {}

  create(createTransactionDto: CreateTransactionDto) {
    return this.prismaService.transaction.create({
      data: createTransactionDto,
    });
  }

  findAll() {
    return this.prismaService.transaction.findMany({ where: {} });
  }

  findAllByQuery(fromId: number, toId: number) {
    const where = {};
    if (fromId) {
      where['fromId'] = fromId;
    }
    if (toId) {
      where['toId'] = toId;
    }
    return this.prismaService.transaction.findMany({ where });
  }

  findOne(id: number) {
    return this.prismaService.transaction.findUnique({ where: { id } });
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return this.prismaService.transaction.update({
      where: { id },
      data: updateTransactionDto,
    });
  }

  remove(id: number) {
    return this.prismaService.transaction.delete({ where: { id } });
  }
}
