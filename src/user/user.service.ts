import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './input/create-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async getUserById(id: number) {
    return await this.userRepo.findOneByOrFail({ id });
  }

  async getUserByEmail(email: string) {
    return await this.userRepo.findOneBy({ email });
  }

  async getAllUsers() {
    return await this.userRepo.find();
  }

  async createNewUser(createUserInput: CreateUserInput) {
    try {
      const isAlreadyExist = await this.getUserByEmail(createUserInput.email);
      if (isAlreadyExist)
        throw new HttpException(
          'Email is Alread Exist!',
          HttpStatus.BAD_REQUEST,
        );
      const newUser = this.userRepo.create(createUserInput);
      return await this.userRepo.save(newUser);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
