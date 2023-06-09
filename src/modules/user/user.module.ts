import { Module } from '@nestjs/common';
import { PrismaService } from '../../common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from '../../common';

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
