import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateAttendanceDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  rank: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  notes?: string;
}
