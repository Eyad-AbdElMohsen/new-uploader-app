import { registerEnumType } from '@nestjs/graphql';

export enum FileUseCaseEnum {
  PROFILE_PICTURE = 'PROFILE_PICTURE',
}

registerEnumType(FileUseCaseEnum, {
  name: 'UploadUseCaseEnum',
});
