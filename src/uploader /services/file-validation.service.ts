import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadFileInput } from '../inputs/upload-file.input';
import { FileModelUseCaseValidatorOptions } from '../options/file-model-use-case-validator.options';
import { FileValidationOptions } from '../types/file-validation-options.type';
import { FileTypeEnum } from '../enums/file-type.enum';
import * as Busboy from 'busboy';
import { validationOptions } from '../options/validation.options';

@Injectable()
export class UploaderValidationService {
  validator(
    fileInput: UploadFileInput,
    sizeInBytes: number,
    isFirstChunk: boolean,
    metadata: Busboy.FileInfo,
  ) {
    //if(!isFirstChunk)

    const { useCase, model } = fileInput;
    const allowedUseCases = FileModelUseCaseValidatorOptions[model];
    if (!allowedUseCases?.includes(useCase)) {
      throw new BadRequestException('Invalid model/useCase combination');
    }

    const validation: FileValidationOptions = validationOptions[useCase];
    if (!validation) {
      throw new BadRequestException('No validation rule for this useCase');
    }

    const fileExtension: FileTypeEnum = FileTypeEnum[metadata.mimeType];
    if (!validation.acceptedFormats.includes(fileExtension)) {
      throw new BadRequestException('Invalid file format');
    }

    if(sizeInBytes > validationOptions[useCase].maxSizeInBytes){
      throw new BadRequestException('Max file size exceeded');
    }
      
    return true
  }
}
