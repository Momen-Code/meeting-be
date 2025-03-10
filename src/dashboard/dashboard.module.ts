import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AdminJwtAuth } from 'src/common/guards/admin-auth.guard';
import { AdminModule } from './admin/admin.module';
import { AttendanceModule } from './attendance/attendance.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AdminModule, AttendanceModule, AuthModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AdminJwtAuth,
    },
  ],
})
export class DashboardModule {}
