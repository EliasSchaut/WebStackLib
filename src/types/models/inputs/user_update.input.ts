import { Field, InputType } from '@nestjs/graphql';
import { IsName } from '@/common/validation/IsName.validation';

@InputType()
export class UserUpdateInputModel {
  @IsName()
  @Field(() => String, { nullable: true })
  name?: string;
}
