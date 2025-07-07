import { Field, Int, ObjectType } from '@nestjs/graphql';

export function generateGqlResponse<T, k>(
  Tclass: ClassType<T> | ClassType<T>[],
  isArray?: k,
): any {
  const className = isArray
    ? `${Tclass[0].name}sArray`
    : Array.isArray(Tclass)
      ? `${Tclass[0].name}s`
      : Tclass.name;

  type DataSingleType = {
    data: T;
  };
  type DataTypeAsArray = {
    data: T[];
  };
  type DataType = T extends string
    ? 'string'
    : T extends boolean
      ? 'boolean'
      : k extends boolean
        ? DataTypeAsArray
        : DataSingleType;

  @ObjectType(`Gql${className}Response`)
  abstract class GqlResponse {
    @Field(() => Int)
    code: number;

    @Field()
    success: boolean;

    @Field({ nullable: true })
    message?: string;

    @Field(() => Tclass)
    data?: DataType;
  }

  return GqlResponse;
}

export const GqlStringResponse = generateGqlResponse(String);
export const GqlBooleanResponse = generateGqlResponse(Boolean);
export const GqlStringArrayResponse = generateGqlResponse([String], true);

export type ClassType<T> = {
  new (...args: any[]): T; // constructor
};
