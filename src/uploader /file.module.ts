import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entity/file.entity';
import { UploaderService } from './services/uploader.service';
import { UploadController } from './controller/uploader.controller';
import { LOCAL_STRATEGY } from './strategies';
import { UploaderLocalStrategy } from './strategies/uploader-local.strategy';
import { UploaderValidationService } from './services/file-validation.service';

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  providers: [
    UploaderValidationService,
    UploaderService,
    { provide: LOCAL_STRATEGY, useClass: UploaderLocalStrategy },
  ],
  exports: [],
  controllers: [UploadController],
})
export class FileModule {}
