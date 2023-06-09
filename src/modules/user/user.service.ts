import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common';
import { CtxType } from '../../types';
import { UserModel } from '../../types';
import { UserUpdateInputModel } from '../../types';
import { PasswordService } from '../../common';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
  ) {}

  async find_by_id(ctx: CtxType): Promise<UserModel | null> {
    return this.prisma.user.findUnique({
      where: { id: ctx.user_id },
    });
  }

  async update(
    user_update_input_data: UserUpdateInputModel,
    ctx: CtxType,
  ): Promise<UserModel | null> {
    return this.prisma.user.update({
      where: { id: ctx.user_id },
      data: user_update_input_data,
    });
  }

  async delete(ctx: CtxType): Promise<UserModel | null> {
    return this.prisma.user.delete({
      where: { id: ctx.user_id },
    });
  }
}
