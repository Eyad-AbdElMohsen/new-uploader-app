import { Field, ObjectType } from '@nestjs/graphql';
import { File } from 'src/uploader /entity/file.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  email: string;

  @Column()
  password: string;

  @Field({ nullable: true })
  access_token?: string;

  @OneToOne(() => File)
  @Field(() => File, { nullable: true })
  @JoinColumn({name: "profilePictureId"})
  profilePicture: File;

  @Column({ nullable: true })
  profilePictureId: number;

  @OneToOne(() => File)
  @Field(() => File, { nullable: true })
  @JoinColumn({name: "userCvId"})
  userCv: File;

  @Column({ nullable: true })
  userCvId: number;
}
