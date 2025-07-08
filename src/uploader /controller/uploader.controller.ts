import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UploaderService } from '../services/uploader.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploaderService) {}

  @Post()
  upload(@Req() req: Request, @Res() res: Response) {
    console.log("hi from controller")
    return this.uploadService.handleUpload(req, res);
  }
}
