import { Module } from '@nestjs/common';
import { ServerResolver } from './server.resolver';
import { ServerService } from './server.service';
import { PrismaService } from '../../common';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [ServerResolver, ServerService, PrismaService, JwtService],
})
export class ServerModule {}
