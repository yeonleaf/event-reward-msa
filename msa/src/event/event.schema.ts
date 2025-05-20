import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventDocument = Event & Document;

@Schema()
export class Event {
  @Prop({ required: true, unique: true })
  event_id: string;

  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  start_date: Date;

  @Prop({ required: true })
  end_date: Date;

  @Prop({ required: true })
  status: boolean;
}

export const EventSchema = SchemaFactory.createForClass(Event);
