import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadFileInput } from '../inputs/upload-file.input';
import { FileModelUseCaseValidatorOptions } from '../options/file-model-use-case-validator.options';
import { FileValidationOptions } from '../types/file-validation-options.type';
import { FileTypeEnum } from '../enums/file-type.enum';
import * as Busboy from 'busboy';
import { validationOptions } from '../options/validation.options';

@Injectable()
export class UploaderValidationService {
  useCaseValidator(fileInput: UploadFileInput) {
    if (
      !FileModelUseCaseValidatorOptions[fileInput.model].includes(
        fileInput.useCase,
      )
    ) {
      throw new BadRequestException('invalid useCase');
    }
  }

  fileValidator(
    fileInput: UploadFileInput,
    sizeInBytes: number,
    metadata: Busboy.FileInfo,
    isFirstChunk: boolean,
  ) {
    const { useCase } = fileInput;
    const validation: FileValidationOptions = validationOptions[useCase];

    if (isFirstChunk) {
      console.log(metadata.mimeType);
      if (
        !validation.acceptedFormats.includes(metadata.mimeType as FileTypeEnum)
      ) {
        throw new BadRequestException('Invalid file format');
      }
    }

    if (sizeInBytes > validationOptions[useCase].maxSizeInBytes) {
      throw new BadRequestException('Max file size exceeded');
    }

    return true;
  }
}
