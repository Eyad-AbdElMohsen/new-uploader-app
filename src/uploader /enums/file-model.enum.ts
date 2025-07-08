import { registerEnumType } from '@nestjs/graphql';

export enum FileModelEnum {
  PUBLIC = 'PUBLIC',
  PROFILE = 'PROFILE',
}

registerEnumType(FileModelEnum, {
  name: 'FileModelEnum',
});
