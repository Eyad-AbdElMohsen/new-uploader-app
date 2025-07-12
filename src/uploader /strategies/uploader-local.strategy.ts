import { Request } from 'express';
import { IUploaderStrategy } from '../interfaces/uploader.strategy';
import * as Busboy from 'busboy';
import * as path from 'path';
import * as fs from 'fs';
import { UploadFileInput } from '../inputs/upload-file.input';
import { BadRequestException } from '@nestjs/common';

export class UploaderLocalStrategy implements IUploaderStrategy {
  async uploadFile(
    req: Request,
    fileInput: UploadFileInput,
    fileValidator: (
      fileInput: UploadFileInput,
      sizeInBytes: number,
      metadata: Busboy.FileInfo,
      isFirstChunk: boolean,
    ) => void,
    callBack: (
      metadata: Busboy.FileInfo,
      sizeInBytes: number,
      saveName: string,
    ) => Promise<void>,
  ): Promise<any> {
    const busboy = Busboy({ headers: req.headers });

    const UPLOAD_DIR = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'storage',
      fileInput.model,
    );

    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    let saveName: string;
    busboy.on(
      'file',
      (
        fieldname: string,
        fileStream: NodeJS.ReadableStream,
        metadata: Busboy.FileInfo,
      ) => {
        saveName = `${fileInput.useCase}-${Date.now()}-${metadata.filename}`;

        const savePath = path.join(UPLOAD_DIR, saveName);
        const writeStream = fs.createWriteStream(savePath);

        let sizeInBytes = 0;
        let isFirstChunk = true;

        fileStream.on('data', (chunk) => {
          sizeInBytes += chunk.length;
          try {
            fileValidator(fileInput, sizeInBytes, metadata, isFirstChunk);
          } catch (err) {
            this.destroyWriteStream(writeStream, savePath);
            throw err;
          }
          isFirstChunk = false;
          writeStream.write(chunk);
        });

        fileStream.on('end', async () => {
          writeStream.end();
          try {
            await callBack(metadata, sizeInBytes, saveName);
          } catch (error) {
            this.destroyWriteStream(writeStream, savePath);
            throw error;
          }
        });

        fileStream.on('error', (err) => {
          this.destroyWriteStream(writeStream, savePath);
          throw new BadRequestException('error while uploading the file');
        });
      },
    );

    req.pipe(busboy);
  }

  destroyWriteStream(writeStream: fs.WriteStream, savePath: string): void {
    writeStream.destroy();
    fs.rmSync(savePath, { force: true });
  }
}
