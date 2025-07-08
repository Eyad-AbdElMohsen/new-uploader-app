import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserInput } from './input/create-user.input';
import { generateGqlResponse } from 'src/gql/graphql-response';
import { LoginInput } from './input/login-input';
import { AuthGuard } from 'src/guards/auth.guard';

const GqlUserResponse = generateGqlResponse(User);
const GqlUsersResponse = generateGqlResponse([User], true);

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Query(() => GqlUserResponse)
  async getUser(@Args('id', ParseIntPipe) id: number) {
    return await this.userService.getUserById(id);
  }

  @Query(() => GqlUsersResponse)
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Mutation(() => GqlUserResponse)
  async register(@Args('input') input: CreateUserInput) {
    return await this.userService.register(input);
  }

  @Mutation(() => GqlUserResponse)
  async login(@Args('input') input: LoginInput) {
    return await this.userService.login(input);
  }
}
