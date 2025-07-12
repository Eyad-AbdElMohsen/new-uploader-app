import * as fs from 'fs';
import * as path from 'path';
import * as Busboy from 'busboy';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from '../entity/file.entity';
import { UploadFileInput } from '../inputs/upload-file.input';
import { LOCAL_STRATEGY } from '../strategies';
import { IUploaderStrategy } from '../interfaces/uploader.strategy';
import { UploaderValidationService } from './file-validation.service';

@Injectable()
export class UploaderService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    @Inject(LOCAL_STRATEGY)
    private readonly localUploaderStrategy: IUploaderStrategy,
    private readonly uploaderValidationService: UploaderValidationService,
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

    try {
      this.uploaderValidationService.useCaseValidator(fileInput);

      await this.localUploaderStrategy.uploadFile(
        req,
        fileInput,
        this.uploaderValidationService.fileValidator,
        async (
          metadata: Busboy.FileInfo,
          sizeInBytes: number,
          fileName: string,
        ) => {
          const file = this.fileRepository.create({
            encoding: metadata.encoding,
            fileModel: fileInput.model,
            fileUseCase: fileInput.useCase,
            sizeInBytes,
            fileName,
            mimeType: metadata.mimeType,
          });
          await this.fileRepository.save(file);
        },
      );
    } catch (err) {
      console.log(err);
    }

    return 'file uploaded successfully';
  }
}
