import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsUrl } from 'class-validator';
import { IsPassword } from '@/common/validation/decorators/IsPassword.validation';
import { IsName } from '@/common/validation/decorators/IsName.validation';
import { IsUsername } from '@/common/validation/decorators/IsUsername.validation';

@InputType()
export class UserInputModel {
  @IsUsername()
  @Field(() => String, {})
  username!: string;

  @IsEmail()
  @Field(() => String, {})
  email!: string;

  @IsPassword()
  @Field(() => String, {})
  password!: string;

  @IsName()
  @Field(() => String, {})
  first_name!: string;

  @IsName()
  @Field(() => String, {})
  last_name!: string;

  @IsUrl()
  @Field(() => String, { nullable: true })
  avatar?: string;

  @Field(() => Boolean, { nullable: true })
  profile_public?: boolean;

  @Field(() => Boolean, { nullable: true })
  email_opt_in?: boolean;
}
