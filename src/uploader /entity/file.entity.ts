import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('files')
@ObjectType()
export class File {
  @Field()
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column()
  filename: string;

  @Field()
  @Column()
  mimeType: string;

  @Field()
  @Column()
  encoding: string;

  @Field()
  @Column()
  url: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  path?: string; // Optional internal S3 key if needed

  @Field(() => Number)
  @Column('bigint')
  size: number; // Size in bytes

  @Field({ nullable: true })
  @Column({ nullable: true })
  uploaderId?: string; // Optional foreign key to User
}
