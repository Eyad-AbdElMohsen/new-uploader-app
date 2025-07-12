import { Request, Response } from 'express';
import { UploadFileInput } from '../inputs/upload-file.input';
import * as fs from 'fs';
import * as Busboy from 'busboy';

export interface IUploaderStrategy {
  uploadFile(
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
  ): Promise<Partial<File>>;

  destroyWriteStream(writeStream: fs.WriteStream, savePath: string): void;

  //   deleteFile(filename: string): Promise<boolean>;
  //   streamFile(file) ;
}
