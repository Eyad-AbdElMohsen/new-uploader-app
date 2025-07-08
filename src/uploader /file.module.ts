import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entity/file.entity';
import { UploaderService } from './services/uploader.service';
import { UploadController } from './controller/uploader.controller';

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  providers: [UploaderService],
  exports: [],
  controllers: [UploadController],
})
export class FileModule {}
