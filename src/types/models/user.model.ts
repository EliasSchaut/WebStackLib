import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserModel {
  @Field(() => ID, { description: "Unique id number of user used for comparison" })
  id!: number;

  @Field(() => String, { description: "Unique email of user used for login" })
  username!: string;

  @Field(() => String, { description: "Public name of user used to display to others" })
  name!: string;

  @Field(() => String, {
    description: "Challenge string used for password reset and account verification",
    nullable: true,
  })
  challenge?: string;

  @Field(() => String, {
    description: "Hashed password of user used for login",
    nullable: true,
  })
  password?: string;

  @Field(() => Number, {
    description: "Unique id number of server on which the user is registered",
    nullable: true,
  })
  server_id?: number;

  @Field(() => Boolean, {
    description: "Indicates whether the user account is verified",
    nullable: true,
  })
  verified?: boolean;

  @Field(() => Boolean, {
    description: "Indicates whether a password reset was requested",
    nullable: true,
  })
  pw_reset?: boolean;
}