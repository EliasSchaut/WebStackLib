import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { IsPassword } from '../../../common';
import { IsName } from '../../../common';

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
