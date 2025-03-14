import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AttendanceDocument = Attendance & Document;

@Schema({ _id: true, timestamps: true })
export class Attendance {
  @Prop({ type: String, required: true })
  name?: string;

  @Prop({ type: String, required: true })
  rank?: string;

  @Prop({ type: String, required: true, default: 'pending' })
  status?: string;

  @Prop({ type: String, required: false })
  notes?: string;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
