import { hash } from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '@entities/users.entity';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { CreateUserDto } from '@dtos/users.dto';

@EntityRepository()
class UserService extends Repository<UserEntity> {
  public async findAllUser(): Promise<UserEntity[]> {
    const users: UserEntity[] = await UserEntity.find();
    return users;
  }

  public async findUserById(userId: number): Promise<UserEntity> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    const findUser: UserEntity = await UserEntity.findOne({
      where: { id: userId },
    });
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<UserEntity> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: UserEntity = await UserEntity.findOne({
      where: { email: userData.email },
    });
    if (findUser)
      throw new HttpException(
        409,
        `You're email ${userData.email} already exists`,
      );

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: UserEntity = await UserEntity.create({
      ...userData,
      password: hashedPassword,
    }).save();

    return createUserData;
  }

  public async updateUser(
    userId: number,
    userData: CreateUserDto,
  ): Promise<UserEntity> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: UserEntity = await UserEntity.findOne({
      where: { id: userId },
    });
    if (!findUser) throw new HttpException(409, "You're not user");

    const hashedPassword = await hash(userData.password, 10);
    await UserEntity.update(userId, { ...userData, password: hashedPassword });

    const updateUser: UserEntity = await UserEntity.findOne({
      where: { id: userId },
    });
    return updateUser;
  }

  public async deleteUser(userId: number): Promise<UserEntity> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    const findUser: UserEntity = await UserEntity.findOne({
      where: { id: userId },
    });
    if (!findUser) throw new HttpException(409, "You're not user");

    await UserEntity.delete({ id: userId });
    return findUser;
  }
}

export default UserService;
