import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { UserCreateRequestDto } from './user-create-request.dto';
import { UserUpdateRequestDto } from './user-update-request.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  public findOne(filter?, projection?, options?): Promise<User> {
    return this.userModel.findOne(filter, projection, options);
  }

  public create(data: UserCreateRequestDto): Promise<User> {
    const user = new this.userModel({ ...data, active: false });
    return user.save();
  }

  public async update(id: string, data: UserUpdateRequestDto): Promise<User> {
    await this.userModel.findOneAndUpdate({ _id: id }, data);
    return this.userModel.findOne({ _id: id });
  }
}
