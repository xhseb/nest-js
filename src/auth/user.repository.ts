import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CustomRepository } from '../boards/typeorm-ex.decorator';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    console.log('salt ', salt);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('hashed password ', hashedPassword);

    const user = this.create({ username, password: hashedPassword });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505')
        throw new ConflictException('Existing username');
      else throw new InternalServerErrorException();
    }
  }
}
