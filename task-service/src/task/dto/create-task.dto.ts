import { IsNotEmpty, IsOptional, IsEnum, IsInt, IsDateString } from 'class-validator';
import { TaskStatus } from '../../../generated/prisma';

export class CreateTaskDto {
  @IsNotEmpty()
  description: string;

  @IsInt()
  projectId: number;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsInt()
  predecessorTaskId?: number;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
