import { Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from '../dto/create-attendance.dto';
import { Attendance } from '../entities/attendance.entity';

@Injectable()
export class AttendanceFactoryService {
  async createNewAttendance(createAttendanceDto: CreateAttendanceDto) {
    const newAttendance = new Attendance();

    newAttendance.name = createAttendanceDto.name;
    newAttendance.rank = createAttendanceDto.rank;
    newAttendance.notes = createAttendanceDto.notes;

    return newAttendance;
  }
}
