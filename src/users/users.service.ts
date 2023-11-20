import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUsersService } from './users.service.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';

@injectable()
export class UsersService implements IUsersService {
  constructor(@inject(TYPES.IConfigService) private configService: IConfigService) {}

  async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
    const newUser = new User(email, name);
    const salt = Number(this.configService.get('SALT'));
    console.log(salt);
    await newUser.setPassword(password, salt);

    return null;
  }

  async validateUser({ email, name, password }: UserRegisterDto): Promise<boolean> {
    return true;
  }
}
