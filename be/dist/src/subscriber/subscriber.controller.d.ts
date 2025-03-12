import { SubscriberDTO } from './dto/create-subs.dto';
import { SubscriberService } from './subscriber.service';
export declare class SubscriberController {
    private readonly subscriberService;
    constructor(subscriberService: SubscriberService);
    createSubs(subs: SubscriberDTO): Promise<{
        status: number;
        message: string;
        data?: undefined;
    } | {
        status: number;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("../../Schemas/subscriber.schema").Subscriber> & import("../../Schemas/subscriber.schema").Subscriber & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
}
