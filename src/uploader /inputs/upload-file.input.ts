import { IsEnum } from 'class-validator';
import { FileModelEnum } from '../enums/file-model.enum';
import { FileUseCaseEnum } from '../enums/file-use-case.enum';

export class UploadFileInput {
  @IsEnum(FileUseCaseEnum)
  useCase: FileUseCaseEnum;

  @IsEnum(FileModelEnum)
  model: FileModelEnum;
}
