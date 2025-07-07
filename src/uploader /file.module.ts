import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entity/file.entity';
import { FileService } from './services/file.service';
import { FileResolver } from './resolver/file.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  providers: [FileService, FileResolver],
  exports: [],
})
export class FileModule {}
