import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common';
import { JwtService } from '@nestjs/jwt';
import { AuthModel } from '../../types';
import { CtxType } from '../../types';
import { GraphQLError } from 'graphql/error';
import { PasswordService } from '../../common';
import { UserPwResetInputModel } from '../../types';
import { UserModel } from '../../types';
import { EmailService } from '../../common';
import { UserInputModel } from '../../types';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
    private readonly emailService: EmailService,
  ) {}

  async sign_in(
    username: string,
    password: string,
    ctx: CtxType,
  ): Promise<AuthModel> {
    const user = await this.prisma.user.findUnique({
      select: { id: true, password: true, verified: true },
      where: { username: username },
    });

    if (user === null) {
      throw new GraphQLError(ctx.i18n.t('auth.exception.forbidden_login'), {
        extensions: { code: 'WARNING' },
      });
    }
    if (!(await this.passwordService.compare(password, user.password))) {
      throw new GraphQLError(ctx.i18n.t('auth.exception.forbidden_login'), {
        extensions: { code: 'WARNING' },
      });
    }
    if (!user.verified) {
      throw new GraphQLError(
        ctx.i18n.t('auth.exception.forbidden_not_verified'),
        {
          extensions: { code: 'WARNING' },
        },
      );
    }

    const payload = { username: user.id, sub: null };
    return {
      barrier_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(
    user_input_data: UserInputModel,
    ctx: CtxType,
  ): Promise<UserModel | null> {
    user_input_data.password = await this.passwordService.hash(
      user_input_data.password,
    );
    return this.prisma.user
      .create({
        select: {
          id: true,
          username: true,
          name: true,
          verified: true,
          challenge: true,
        },
        data: {
          ...user_input_data,
          server_id: ctx.server_id,
        },
      })
      .then(({ challenge, ...user }) => {
        this.emailService.send_verify(
          user.username,
          user.name,
          this.emailService.generate_verify_url(challenge),
        );
        return user;
      })
      .catch((e) => {
        if (e.code === 'P2002') {
          throw new GraphQLError(
            ctx.i18n.t('user.exception.conflict_username'),
            {
              extensions: { code: 'WARNING' },
            },
          );
        }
        throw new GraphQLError(ctx.i18n.t('user.exception.create'), {
          extensions: { code: 'DANGER' },
        });
      });
  }

  async verify(challenge: string, ctx: CtxType): Promise<UserModel | null> {
    const user = await this.prisma.user.findUnique({
      where: { challenge: challenge },
    });
    if (!user || user.verified) {
      throw new GraphQLError(ctx.i18n.t('auth.exception.not_found_verify'), {
        extensions: { code: 'WARNING' },
      });
    }

    return this.prisma.user.update({
      where: { id: user.id },
      data: {
        verified: true,
      },
    });
  }

  async reset_password(
    user_pw_reset_input_data: UserPwResetInputModel,
    ctx: CtxType,
  ): Promise<UserModel | null> {
    const user = await this.prisma.user.findUnique({
      where: { challenge: user_pw_reset_input_data.challenge },
    });
    if (!user || !user.pw_reset) {
      throw new GraphQLError(
        ctx.i18n.t('auth.exception.not_found_password_reset'),
        {
          extensions: { code: 'WARNING' },
        },
      );
    }

    return this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: await this.passwordService.hash(
          user_pw_reset_input_data.password,
        ),
        pw_reset: false,
      },
    });
  }

  async reset_password_request(
    username: string,
    ctx: CtxType,
  ): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { username: username },
    });
    if (!user) {
      return false;
    }

    const challenge = await this.passwordService.generate_challenge();
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        challenge: challenge,
        pw_reset: true,
      },
    });

    const pw_reset_url = this.emailService.generate_pw_reset_url(challenge);
    await this.emailService.send_password_reset(
      user.username,
      user.name,
      pw_reset_url,
    );
    return true;
  }
}
