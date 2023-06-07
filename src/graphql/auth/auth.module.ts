import { Module } from '@nestjs/common';
import { AuthService } from '@/graphql/auth/auth.service';
import { PrismaService } from '@/common/db/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from '@/graphql/auth/auth.resolver';
import { AuthGuard } from '@/graphql/auth/auth.guard';
import { PasswordService } from "@/common/util/password.service";
import { EmailService } from "@/common/util/email.service";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET as string,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION as string },
    }),
  ],
  providers: [AuthService, AuthGuard, AuthResolver, PrismaService, PasswordService, EmailService],
  exports: [AuthService],
})
export class AuthModule {}
