import { Model } from 'mongoose';
import { Subscriber } from 'Schemas/subscriber.schema';
import { SubscriberDTO } from './dto/create-subs.dto';
export declare class SubscriberService {
    private readonly subscriberModel;
    constructor(subscriberModel: Model<Subscriber>);
    createSubs(subs: SubscriberDTO): Promise<{
        status: number;
        message: string;
        data?: undefined;
    } | {
        status: number;
        message: string;
        data: import("mongoose").Document<unknown, {}, Subscriber> & Subscriber & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
}
