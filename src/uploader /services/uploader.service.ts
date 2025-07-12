import * as fs from 'fs';
import * as path from 'path';
import * as Busboy from 'busboy';
import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from '../entity/file.entity';
import { UploadFileInput } from '../inputs/upload-file.input';
import { validationOptions } from '../options/validation.options';
import { FileModelUseCaseValidatorOptions } from '../options/file-model-use-case-validator.options';
import { FileValidationOptions } from '../types/file-validation-options.type';
import { FileTypeEnum } from '../enums/file-type.enum';
import { LOCAL_STRATEGY } from '../strategies';
import { IUploaderStrategy } from '../interfaces/uploader.strategy';

@Injectable()
export class UploaderService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    @Inject(LOCAL_STRATEGY)
    private readonly localUploaderStrategy: IUploaderStrategy,
  ) {}

  async uploadFile(req: Request) {
    const fileInput = plainToInstance(UploadFileInput, {
      useCase: req.headers.usecase,
      model: req.headers.model,
    });

    try {
      await validateOrReject(fileInput);
    } catch (err) {
      throw new BadRequestException('validation error');
    }

    await this.localUploaderStrategy.uploadFile(
      req,
      fileInput,
      () => {},
      async () => {},
    );

    return 'file uploaded successfully';
  }
}
