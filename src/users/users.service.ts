import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUsersService } from './users.service.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';
import { IUsersRepository } from './users.repository.interface';
import { UserModel } from '@prisma/client';

@injectable()
export class UsersService implements IUsersService {
  constructor(
    @inject(TYPES.IConfigService) private configService: IConfigService,
    @inject(TYPES.UsersRepository) private usersRepository: IUsersRepository,
  ) {}

  async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
    const newUser = new User(email, name);
    const salt = Number(this.configService.get('SALT'));
    await newUser.setPassword(password, salt);

    const existedUser = await this.usersRepository.find(email);

    if (existedUser) {
      return null;
    }

    return await this.usersRepository.create(newUser);
  }

  async validateUser({ email, name, password }: UserRegisterDto): Promise<boolean> {
    return true;
  }
}
