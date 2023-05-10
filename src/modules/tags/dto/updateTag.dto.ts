import { PartialType } from '@nestjs/mapped-types';
import { IsDefined, IsOptional, IsString, IsUUID } from 'class-validator';
import { CreateTagDto } from './createTag.dto';
import { TagConditions } from './tagConditions.dto';

export class UpdateTagDto extends PartialType(CreateTagDto) {
  @IsString()
  @IsDefined()
  name: string;

  @IsString()
  @IsDefined()
  type: string;

  @IsDefined()
  @IsUUID()
  updatedBy: string;

  @IsString()
  @IsOptional()
  resourceId?: string;

  @IsString()
  @IsOptional()
  resourceType?: string;

  @IsString()
  @IsOptional()
  resource?: string;

  @IsOptional()
  conditions?: TagConditions[];
}
