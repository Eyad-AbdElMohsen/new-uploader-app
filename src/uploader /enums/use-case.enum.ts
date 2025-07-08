import { registerEnumType } from '@nestjs/graphql';

export enum FileModelEnum {
  PUBLIC = 'PUBLIC',
  PROFILE = 'PROFILE',
}

registerEnumType(FileModelEnum, {
  name: 'FileModelEnum',
});

export enum FileUploadUseCaseEnum {
  PROFILE_PICTURE = 'PROFILE_PICTURE',
}

registerEnumType(FileUploadUseCaseEnum, {
  name: 'UploadUseCaseEnum',
});
