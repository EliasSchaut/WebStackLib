import { Field, InputType } from "@nestjs/graphql";
import { IsEmail } from "class-validator";
import { IsPassword } from "@/common/validation/IsPassword.validation";
import { IsName } from "@/common/validation/IsName.validation";

@InputType()
export class UserInputModel {

  @IsEmail()
  @Field(() => String, {})
  username!: string;

  @IsPassword()
  @Field(() => String, {})
  password!: string;

  @IsName()
  @Field(() => String, {})
  name!: string;
}
