import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TransactionEntity } from 'src/transactions/entities/transaction.entity';

@Injectable()
export class MyTransactionsService {
  constructor(private prismaService: PrismaService) {}

  async getTransactions(
    id: number,
    type?: string,
    from?: string,
    to?: string,
    skip: number = 0,
    take: number = 10,
  ) {
    let where: any = {
      OR: [
        {
          fromId: id,
        },
        {
          toId: id,
        },
      ],
    };
    const include: any = {
      from: true,
      to: true,
    };
    if (type === 'send') {
      where = {
        fromId: id,
      };
    } else if (type === 'receive') {
      where = {
        toId: id,
      };
    }
    if (from) {
      where = {
        toId: id,
        from: {
          is: {
            username: from,
          },
        },
      };
    } else if (to) {
      where = {
        fromId: id,
        to: {
          is: {
            username: to,
          },
        },
      };
    }
    const query: any = {
      where,
      include,
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take,
    };
    // const transactions = await this.prismaService.transaction.findMany(query);
    const [transactions, count] = await this.prismaService.$transaction([
      this.prismaService.transaction.findMany(query),
      this.prismaService.transaction.count({ where: query.where }),
    ]);
    const myTransactions = transactions.map(
      (transaction: TransactionEntity) => {
        return {
          id: transaction.id,
          fromId: transaction.fromId,
          toId: transaction.toId,
          amount: transaction.amount,
          fromUsername: transaction.from.username,
          toUsername: transaction.to.username,
          createdAt: transaction.createdAt,
        };
      },
    );
    return {
      total: count,
      data: myTransactions,
    };
  }
}
