import { HttpException } from '@nestjs/common';

export type FileValidationOptions = {
  maxSizeInBytes: number;
  acceptedFormats: string[];
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
