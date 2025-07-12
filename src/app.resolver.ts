import { Query, Resolver } from '@nestjs/graphql';
import { AppService } from './app.service';
import { GqlStringResponse } from './gql/graphql-response';
import { BadRequestException } from '@nestjs/common';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => GqlStringResponse)
  getHello() {
    return this.appService.getHello();
  }
}
