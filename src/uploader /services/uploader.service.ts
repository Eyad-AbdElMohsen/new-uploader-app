import * as fs from 'fs';
import * as path from 'path';
import * as Busboy from 'busboy';
import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from '../entity/file.entity';
import { UploadFileInput } from '../inputs/upload-file.input';

const UPLOAD_DIR = path.resolve(__dirname, '..', '..', '..', 'storage');
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

@Injectable()
export class UploaderService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepo: Repository<File>,
  ) {}

  async handleUpload(req: Request, res: Response) {
    const busboy = Busboy({ headers: req.headers });
    const formFields: Record<string, string> = {};

    busboy.on('field', (fieldname, value) => {
      formFields[fieldname] = value;
    });

    busboy.on(
      'file',
      (
        fieldname: string,
        fileStream: NodeJS.ReadableStream,
        metadata: Busboy.FileInfo,
      ) => {
        const saveName = `${Date.now()}-${metadata.filename}`;
        const savePath = path.join(UPLOAD_DIR, saveName);
        const writeStream = fs.createWriteStream(savePath);

        let sizeInBytes = 0;

        fileStream.on('data', (chunk) => {
          sizeInBytes += chunk.length;
          console.log(chunk.length);
          writeStream.write(chunk);
        });

        fileStream.on('end', async () => {
          writeStream.end();

          try {
            const dto = plainToInstance(UploadFileInput, {
              useCase: formFields.useCase,
              model: formFields.model,
            });

            await validateOrReject(dto);

            const fileEntity = this.fileRepo.create({
              fileName: saveName,
              encoding: metadata.encoding,
              mimeType: metadata.mimeType,
              sizeInBytes,
              fileModel: dto.model,
              fileUseCase: dto.useCase,
            });

            const saved = await this.fileRepo.save(fileEntity);

            res.status(201).json({
              message: 'Upload successful',
              file: {
                id: saved.id,
                fileName: saved.fileName,
                mimeType: saved.mimeType,
                sizeInBytes: saved.sizeInBytes,
                url: saved.url,
              },
            });
          } catch (err) {
            writeStream.destroy();
            fs.rmSync(savePath, { force: true });
            res
              .status(400)
              .json({ error: 'Invalid upload input', details: err });
          }
        });

        fileStream.on('error', (err) => {
          console.error('Stream error:', err);
          writeStream.destroy();
          res.status(500).json({ error: 'File stream failed' });
        });
      },
    );

    req.pipe(busboy);
  }
}
