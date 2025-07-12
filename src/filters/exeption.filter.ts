import {
  ArgumentsHost,
  Catch,
  HttpException,
  ExceptionFilter,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { GraphQLError } from 'graphql';
import { QueryFailedError } from 'typeorm';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  res = {
    code: 500,
    message: 'Internal Server Error',
    success: false,
  };
  catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof HttpException) {
      this.res.code = exception.getStatus();
      const response = exception.getResponse();
      this.res.message =
        typeof response === 'string'
          ? response
          : (response as any).message || exception.message;

      console.error(`Http Exception Error: ${this.res.message}`);
    } else if (exception instanceof GraphQLError) {
      this.res.message = exception.message;
      this.res.code = (exception.extensions?.code as number) || 500;
      console.error(`GraphQL Error: ${this.res.message}`);
    } else if (exception instanceof QueryFailedError) {
      this.res.message = exception.message;
      console.error(
        `Query Failed Error: ${this.res.message}`,
        `Stack: ${exception.stack}`,
        `SQL: ${exception.query}`,
      );
    } else if (exception instanceof Error) {
      this.res.message = exception.message;
      console.error(`Error: ${this.res.message}`);
    }
    if (host.getType() == 'http') {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();

      return response.status(this.res.code).json(this.res);
    }
    return this.res;
  }
}
