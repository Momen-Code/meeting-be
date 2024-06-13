import { Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FindAllResponse, UpdateResponse } from 'src/common/dto/response.dto';
import { swagger } from '../../common/constants/swagger.constant';
import { AttendanceService } from './attendance.service';
import { FindAllQueryDto } from './dto/find-all-query.dto';

@Controller('dashboard/attendance')
@ApiTags(swagger.DashboardAttendance)
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Get()
  @ApiBearerAuth()
  async getAll(@Query() query: FindAllQueryDto) {
    const getAllAttendancesResponse = new FindAllResponse();
    try {
      const attendance = await this.attendanceService.findAll(query);
      getAllAttendancesResponse.success = true;
      getAllAttendancesResponse.data = attendance.data;
      getAllAttendancesResponse.currentPage = attendance.currentPage;
      getAllAttendancesResponse.numberOfPages = attendance.numberOfPages;
      getAllAttendancesResponse.numberOfRecords = attendance.numberOfRecords;
    } catch (error) {
      getAllAttendancesResponse.success = false;
      throw error;
    }
    return getAllAttendancesResponse;
  }

  @Patch('accept/:id')
  @ApiBearerAuth()
  async accept(@Param('id') id: string) {
    const updateAttendanceResponse = new UpdateResponse();
    try {
      const Attendance = await this.attendanceService.accept(id);
      updateAttendanceResponse.success = true;
      updateAttendanceResponse.data = Attendance;
    } catch (error) {
      updateAttendanceResponse.success = false;
      throw error;
    }
    return updateAttendanceResponse;
  }

  @Patch('/reject/:id')
  @ApiBearerAuth()
  async reject(@Param('id') id: string) {
    const updateAttendanceResponse = new UpdateResponse();
    try {
      const Attendance = await this.attendanceService.reject(id);
      updateAttendanceResponse.success = true;
      updateAttendanceResponse.data = Attendance;
    } catch (error) {
      updateAttendanceResponse.success = false;
      throw error;
    }
    return updateAttendanceResponse;
  }
}
