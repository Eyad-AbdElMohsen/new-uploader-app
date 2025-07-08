import { FileModelEnum } from '../enums/file-model.enum';
import { FileUseCaseEnum } from '../enums/file-use-case.enum';

export const FileModelUseCaseValidatorOptions: {
  [key in FileModelEnum]: FileUseCaseEnum[];
} = {
  PUBLIC: [],
  PROFILE: [FileUseCaseEnum.PROFILE_PICTURE],
};
