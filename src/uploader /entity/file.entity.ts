import { ObjectType, Field } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { FileModelEnum, FileUploadUseCaseEnum } from '../enums/use-case.enum';

@Entity('files')
@Index(['fileName'])
@ObjectType()
export class File {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field({ nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  deletedAt?: Date;

  @Field()
  @Column()
  fileName: string;

  @Column()
  @Field()
  encoding: string;

  @Field()
  @Column()
  mimeType: string;

  @Column()
  @Field()
  sizeInBytes: number;

  @Column({ default: false })
  @Field()
  hasReference: boolean;

  @Column({ type: 'enum', enum: FileModelEnum })
  @Field(() => FileModelEnum)
  fileModel: FileModelEnum;

  @Column({ type: 'enum', enum: FileUploadUseCaseEnum })
  @Field(() => FileUploadUseCaseEnum)
  fileUseCase: FileUploadUseCaseEnum;

  @Field(() => String)
  get url(): string {
    return `${this.fileModel}/${this.fileName}`;
  }
}
