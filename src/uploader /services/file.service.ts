import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


@Injectable()
export class FileService {
    constructor(@InjectRepository(File) private readonly fileRepo: Repository<File>){}

    
}