import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subscriber } from 'Schemas/subscriber.schema';
import { SubscriberDTO } from './dto/create-subs.dto';

@Injectable()
export class SubscriberService {
  constructor(
    @InjectModel(Subscriber.name)
    private readonly subscriberModel: Model<Subscriber>,
  ) {}
  async createSubs(subs: SubscriberDTO) {
    const { email } = subs;
    if (!email) {
      return {
        status: 400,
        message: 'Email is required',
      };
    }
    try {
      const subscriber = await this.subscriberModel.findOne({ email });
      if (subscriber) {
        return {
          status: 400,
          message: 'Email already subscribed',
        };
      }
      const newSubscriber = await this.subscriberModel.create({ email });
      return {
        status: 201,
        message: 'Subscribed successfully',
        data: newSubscriber,
      };
    } catch (err) {
      console.error('Error creating subscriber:', err);
      return {
        status: 500,
        message: 'Internal server error',
      };
    }
  }
}
