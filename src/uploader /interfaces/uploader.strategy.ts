import { Request, Response } from 'express';
import { UploadFileInput } from '../inputs/upload-file.input';
import * as fs from 'fs';
import * as Busboy from 'busboy';

export interface IUploaderStrategy {
  uploadFile(
    req: Request,
    fileInput: UploadFileInput,
    validator: (
      fileInput: UploadFileInput,
      sizeInBytes: number,
      isFirstChunk: boolean,
    ) => void,
    callBack: (metadata: Busboy.FileInfo) => Promise<void>,
  ): Promise<Partial<File>>;

  destroyWriteStream(writeStream: fs.WriteStream, savePath: string): void;

  //   deleteFile(filename: string): Promise<boolean>;
  //   streamFile(file) ;
}
