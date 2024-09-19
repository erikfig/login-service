import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Token } from './token.schema';
import { Model } from 'mongoose';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TokenService {
  constructor(@InjectModel(Token.name) private tokenModel: Model<Token>) {}

  public findOne(filter?, projection?, options?): Promise<Token> {
    return this.tokenModel.findOne(filter, projection, options);
  }

  public create(data): Promise<Token> {
    const token = new this.tokenModel({ ...data });
    return token.save();
  }

  public delete(filter) {
    return this.tokenModel.deleteOne(filter);
  }

  @Cron('0 1 * * * *')
  public deleteOldTokens() {
    const today = new Date();
    const days30 = 1000 * 60 * 60 * 24 * 30;
    const filterDate = new Date(today.getTime() - days30);

    return this.tokenModel.deleteMany({ created_at: { $lt: filterDate } });
  }
}
