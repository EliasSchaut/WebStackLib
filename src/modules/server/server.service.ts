import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common';
import { CtxType } from '../../types';

@Injectable()
export class ServerService {
  constructor(private readonly prisma: PrismaService) {}

  async find_by_id({ server_id }: CtxType) {
    return this.prisma.server.findUnique({
      where: {
        id: server_id,
      },
      select: {
        id: true,
        title: true,
        name: true,
        desc: true,
      },
    });
  }
}
