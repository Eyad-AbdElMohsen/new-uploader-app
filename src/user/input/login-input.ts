import { InputType, OmitType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';

@InputType()
export class LoginInput extends OmitType(CreateUserInput, ['name']) {}
