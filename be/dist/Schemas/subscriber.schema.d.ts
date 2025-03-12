import { Document } from 'mongoose';
export declare class Subscriber extends Document {
    email: string;
    subscriberAt: Date;
}
export declare const SubscriberSchema: import("mongoose").Schema<Subscriber, import("mongoose").Model<Subscriber, any, any, any, Document<unknown, any, Subscriber> & Subscriber & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Subscriber, Document<unknown, {}, import("mongoose").FlatRecord<Subscriber>> & import("mongoose").FlatRecord<Subscriber> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
