import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Attendance, AttendanceRepository } from 'src/models';
import { genMatch } from '../../common/helper/match-query.helper';
import { FindAllQueryDto } from './dto/find-all-query.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { MeetingGateway } from 'src/socket/meeting.gateway';

@Injectable()
export class AttendanceService {
  constructor(
    private requestRepository: AttendanceRepository,
    private readonly meetingGateway: MeetingGateway,
  ) {}
  private readonly logger = new Logger(AttendanceService.name);

  public async findAll(query: FindAllQueryDto) {
    const { limit, page, sort, paginate, ...rest } = query || {};
    const match = genMatch(rest);

    try {
      return this.requestRepository.getAll(match, query);
    } catch (error) {
      throw error;
    }
  }

  public async accept(id: string) {
    try {
      const updated = await this.requestRepository.update(
        { _id: id },
        { status: 'accepted' },
        {
          new: true,
          lean: true,
        },
      );

      this.meetingGateway.handleUpdateStatus(updated);
      return updated;
    } catch (error) {
      throw error;
    }
  }
  public async reject(id: string) {
    try {
      const updated = await this.requestRepository.update(
        { _id: id },
        { status: 'rejected' },
        {
          new: true,
          lean: true,
        },
      );
      this.meetingGateway.handleUpdateStatus(updated);
      return updated;
    } catch (error) {
      throw error;
    }
  }
}
