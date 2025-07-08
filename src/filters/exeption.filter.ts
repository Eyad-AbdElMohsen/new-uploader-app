import {
  ArgumentsHost,
  Catch,
  HttpException,
  ExceptionFilter,
} from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { QueryFailedError } from 'typeorm';

@Catch()
export class GraphQLExceptionsFilter implements ExceptionFilter {
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

    return new GraphQLError(this.res.message, {
      extensions: {
        success: this.res.success,
        code: this.res.code,
      },
    });
  }
}
