import { Module } from '@nestjs/common';
import { ServerResolver } from '@/modules/server/server.resolver';
import { ServerService } from '@/modules/server/server.service';
import { PrismaService } from '@/common/db/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [ServerResolver, ServerService, PrismaService, JwtService],
})
export class ServerModule {}
