import { HttpException } from '@nestjs/common';
import { FileTypeEnum } from '../enums/file-type.enum';

export type FileValidationOptions = {
  maxSizeInBytes: number;
  acceptedFormats: FileTypeEnum[];
  isImage?: boolean;
  acceptedDimensions?: {
    minWidth: number;
    minHeight: number;
    maxWidth: number;
    maxHeight: number;
  };
  acceptedAspectRatio?: number;
  error: HttpException;
};
