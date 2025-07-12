import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UploaderService } from '../services/uploader.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploaderService) {}

  @Post()
  async upload(@Req() req: Request) {
    console.log('hello');
    const x = await this.uploadService.uploadFile(req);
    return x;
  }
}
