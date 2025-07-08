import { registerEnumType } from '@nestjs/graphql';

export enum FileUseCaseEnum {
  PROFILE_PICTURE = 'PROFILE_PICTURE',
  CV_FILE = "CV_FILE"
}

registerEnumType(FileUseCaseEnum, {
  name: 'UploadUseCaseEnum',
});
