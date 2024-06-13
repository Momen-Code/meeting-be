import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { FindAllQuery } from 'src/common/dto/findall-query.dto';
import { genMatch } from 'src/common/helper/match-query.helper';
import { FindAllQueryDto } from 'src/dashboard/attendance/dto/find-all-query.dto';
import { Attendance, AttendanceRepository } from 'src/models';
import { MeetingGateway } from '../../socket/meeting.gateway';
@Injectable()
export class AttendanceService {
  constructor(
    private requestRepository: AttendanceRepository,
    private readonly meetingGateway: MeetingGateway,
  ) {}
  private readonly logger = new Logger(AttendanceService.name);

  public async create(request: Attendance) {
    try {
      const requestCreated = await this.requestRepository.create(request);
      if (!requestCreated) {
        throw new BadRequestException('Error creating request');
      }

      this.meetingGateway.handleAddPerson(requestCreated);

      return requestCreated;
    } catch (error) {
      this.logger.error('--Error--', error);
      throw error;
    }
  }

  public async findAll(query: FindAllQueryDto) {
    const { limit, page, sort, paginate, ...rest } = query || {};
    const match = genMatch(rest);

    try {
      return this.requestRepository.getAll(match, query);
    } catch (error) {
      throw error;
    }
  }
}
