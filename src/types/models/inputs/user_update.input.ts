import { Field, InputType } from '@nestjs/graphql';
import { IsName } from '../../../common';

@InputType()
export class UserUpdateInputModel {
  @IsName()
  @Field(() => String, { nullable: true })
  name?: string;
}
