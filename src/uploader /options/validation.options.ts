import { BadRequestException } from '@nestjs/common';
import { FileTypeEnum } from '../enums/file-type.enum';
import { FileUseCaseEnum } from '../enums/file-use-case.enum';
import { FileValidationOptions } from '../types/file-validation-options.type';

export const validationOptions: {
  [key in FileUseCaseEnum]: FileValidationOptions;
} = {
  PROFILE_PICTURE: {
    acceptedFormats: [
      FileTypeEnum.PNG,
      FileTypeEnum.JPG,
      FileTypeEnum.JPEG,
      FileTypeEnum.PNG,
      FileTypeEnum.GIF,
      FileTypeEnum.WEBP,
      FileTypeEnum.SVG,
      FileTypeEnum.BMP,
      FileTypeEnum.TIFF,
    ],
    maxSizeInBytes: 2 * 1024 * 1024,
    error: new BadRequestException('Invalid profile picture'),
  },
  CV_FILE: {
    acceptedFormats: [
        FileTypeEnum.PDF,
        FileTypeEnum.TXT,
        FileTypeEnum.JSON,
    ],
    maxSizeInBytes: 1024 * 1024 * 5,
    error: new BadRequestException('Invalid cv file')
  }
};
