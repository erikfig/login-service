import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash } from 'bcrypt';
import { User } from './user.schema';
import { UserCreateRequestDto } from './user-create-request.dto';
import { UserUpdateRequestDto } from './user-update-request.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  public findOne(filter?, projection?, options?): Promise<User> {
    return this.userModel.findOne(filter, projection, options);
  }

  public async create(data: UserCreateRequestDto): Promise<User> {
    const password = await this.hashPassword(data.password);
    const localData = { ...data, password };
    const user = new this.userModel({ ...localData, active: false });
    const { _id: id } = await user.save();

    return this.userModel.findOne({ _id: id });
  }

  public async update(id: string, data: UserUpdateRequestDto): Promise<User> {
    let localData = { ...data };
    if (data.password) {
      const password = await this.hashPassword(data.password);
      localData = { ...data, password };
    }
    await this.userModel.findOneAndUpdate({ _id: id }, localData);
    return this.userModel.findOne({ _id: id });
  }

  private async hashPassword(password: string): Promise<string> {
    console.log(hash);
    return await hash(password, 10);
  }
}
