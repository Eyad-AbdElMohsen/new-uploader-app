import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { ParseIntPipe } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserInput } from './input/create-user.input';
import {
  generateGqlResponse,
  GqlStringArrayResponse,
  GqlStringResponse,
} from 'src/gql/graphql-response';

const GqlUserResponse = generateGqlResponse(User);
const GqlUsersResponse = generateGqlResponse([User], true);

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => GqlUserResponse)
  async getUser(@Args('id', ParseIntPipe) id: number) {
    return await this.userService.getUserById(id);
  }

  @Query(() => GqlUsersResponse)
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Mutation(() => GqlUserResponse)
  async createNewUser(@Args('input') createUserInput: CreateUserInput) {
    return await this.userService.createNewUser(createUserInput);
  }
}
