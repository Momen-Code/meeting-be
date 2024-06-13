import { Types } from 'mongoose';

export class Attendance {
  readonly _id?: Types.ObjectId;
  name?: string;
  rank?: string;
  status?: string;
  notes?: string;
}
