import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminRepository, AdminSchema } from 'src/models';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminFactoryService } from './factory/admin.factory';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Admin.name,
        schema: AdminSchema,
      },
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService, AdminRepository, AdminFactoryService],
  exports: [AdminService, AdminRepository],
})
export class AdminModule {}
