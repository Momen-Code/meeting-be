import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Attendance, AttendanceRepository, AttendanceSchema } from 'src/models';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';
import { AttendanceFactoryService } from './factory/attendance.factory';
import { MeetingGateway } from 'src/socket/meeting.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Attendance.name,
        schema: AttendanceSchema,
      },
    ]),
  ],
  controllers: [AttendanceController],
  providers: [
    AttendanceService,
    AttendanceRepository,
    AttendanceFactoryService,
    MeetingGateway,
  ],
  exports: [AttendanceService],
})
export class AttendanceModule {}
