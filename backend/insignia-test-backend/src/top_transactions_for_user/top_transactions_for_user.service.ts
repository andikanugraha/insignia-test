import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TopTransactionsForUserService {
  constructor(private prismaService: PrismaService) {}

  async getTopTransactionsForUser(id: number) {
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
      orderBy: {
        amount: 'desc',
      },
      include: {
        from: true,
        to: true,
      },
      take: 10,
    });
    const result = transactions.map((transaction) => {
      if (id === transaction.fromId) {
        return {
          username: transaction.from.username,
          amount: -transaction.amount,
        };
      }
      return {
        username: transaction.to.username,
        amount: transaction.amount,
      };
    });
    return result;
  }
}
