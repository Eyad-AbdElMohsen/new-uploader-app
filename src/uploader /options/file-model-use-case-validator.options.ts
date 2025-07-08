import { FileModelEnum, FileUploadUseCaseEnum } from '../enums/use-case.enum';

export const FileModelUseCaseValidator: {
  [key in FileModelEnum]: FileUploadUseCaseEnum[];
} = {
  PUBLIC: [],
  PROFILE: [FileUploadUseCaseEnum.PROFILE_PICTURE],
};
