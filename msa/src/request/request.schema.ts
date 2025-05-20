import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Request {
  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true })
  event_id: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  request_date: Date;

  @Prop({ required: true })
  status: boolean; // true = success, false = fail
}
export const RequestSchema = SchemaFactory.createForClass(Request);
export type RequestDocument = Request & Document;