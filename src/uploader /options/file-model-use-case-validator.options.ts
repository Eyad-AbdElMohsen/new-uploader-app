import { FileModelEnum, FileUploadUseCaseEnum } from '../enums/use-case.enum';

export const FileModelUseCaseValidatorOptions: {
  [key in FileModelEnum]: FileUploadUseCaseEnum[];
} = {
  PUBLIC: [],
  PROFILE: [FileUploadUseCaseEnum.PROFILE_PICTURE],
};
