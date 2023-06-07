import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/common/db/prisma.service";
import { CtxType } from "@/types/common/ctx.type";
import { UserModel } from "@/types/models/user.model";
import { UserInputModel } from "@/types/models/inputs/user.input";
import { UserUpdateInputModel } from "@/types/models/inputs/user_update.input";
import { PasswordService } from "@/common/util/password.service";
import { UserPwResetInputModel } from "@/types/models/inputs/user_pw_reset.input";
import { GraphQLError } from "graphql/error";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService,
              private readonly passwordService: PasswordService) {
  }

  async find_by_id(ctx: CtxType): Promise<UserModel | null> {
    return this.prisma.user.findUnique({
      where: { id: ctx.user_id }
    });
  }

  async update(user_update_input_data: UserUpdateInputModel, ctx: CtxType): Promise<UserModel | null> {
    return this.prisma.user.update({
      where: { id: ctx.user_id },
      data: user_update_input_data
    });
  }

  async delete(ctx: CtxType): Promise<UserModel | null> {
    return this.prisma.user.delete({
      where: { id: ctx.user_id }
    });
  }
}
