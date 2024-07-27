import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TransactionEntity } from 'src/transactions/entities/transaction.entity';

@Injectable()
export class MyTransactionsService {
  constructor(private prismaService: PrismaService) {}

  async getTransactions(id: number) {
    const transactions = await this.prismaService.transaction.findMany({
      where: {
        OR: [
          {
            fromId: id,
          },
          {
            toId: id,
          },
        ],
      },
      include: {
        from: true,
        to: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return transactions.map((transaction: TransactionEntity) => {
      return {
        id: transaction.id,
        fromId: transaction.fromId,
        toId: transaction.fromId,
        amount: transaction.amount,
        fromUsername: transaction.from.username,
        toUsername: transaction.to.username,
        createdAt: transaction.createdAt,
      };
    });
  }
}
