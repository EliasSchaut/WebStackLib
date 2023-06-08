import { Module } from '@nestjs/common';
import { PrismaService } from '@/common/db/prisma.service';
import { UserService } from '@/modules/user/user.service';
import { UserResolver } from '@/modules/user/user.resolver';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from '@/common/util/password.service';

@Module({
  providers: [
    UserService,
    UserResolver,
    PrismaService,
    JwtService,
    PasswordService,
  ],
})
export class UserModule {}
