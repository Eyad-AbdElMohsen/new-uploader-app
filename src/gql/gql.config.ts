import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

export const createGqlConfig: ApolloDriverConfig = {
  driver: ApolloDriver,
  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  context: ({ req, res }) => ({
    req,
    res,
  }),
  csrfPrevention: false,
  formatError: (error) => ({
    message: error.message,
    extensions: {
      code: error.extensions?.code || 500,
      success: error.extensions?.success,
    },
  }),
};
