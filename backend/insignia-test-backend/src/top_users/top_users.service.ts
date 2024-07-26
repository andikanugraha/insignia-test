import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TopUsersService {
  constructor(private prismaService: PrismaService) {}

  async getTopTransactingUsersByValue() {
    const groupUsers = await this.prismaService.transaction.groupBy({
      by: ['fromId'],
      _sum: {
        amount: true,
      },
      orderBy: {
        _sum: {
          amount: 'desc',
        },
      },
      take: 10,
    });
    const users = await this.prismaService.user.findMany({
      orderBy: {
        id: 'asc',
      },
    });
    const mappedGroupUsers = groupUsers.map((gUser) => {
      const match = users.find((user) => gUser.fromId === user.id);
      return {
        username: match.username,
        transacted_value: gUser._sum.amount,
      };
    });
    return mappedGroupUsers;
  }
}
