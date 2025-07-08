import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './input/create-user.input';
import { LoginInput } from './input/login-input';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
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

  async register(input: CreateUserInput) {
    try {
      const isAlreadyExist = await this.getUserByEmail(input.email);
      if (isAlreadyExist)
        throw new HttpException(
          'Email is Already Exist!',
          HttpStatus.BAD_REQUEST,
        );
      input.password = await bcrypt.hash(input.password, 10);

      const newUser = this.userRepo.create(input);
      return await this.userRepo.save(newUser);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async login(input: LoginInput) {
    const user = await this.getUserByEmail(input.email);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const passwordMatch = await bcrypt.compare(input.password, user.password);
    if (!passwordMatch)
      throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);

    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    user.access_token = token;

    return user;
  }
}
