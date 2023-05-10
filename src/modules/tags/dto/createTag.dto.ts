import {
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { TagConditions } from './tagConditions.dto';

export class CreateTagDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @IsString()
  @IsOptional()
  resource: string;

  @IsString()
  @IsOptional()
  resourceId: string;

  @IsString()
  @IsOptional()
  resourceType: string;

  @IsOptional()
  conditions?: TagConditions[];

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  type: string;

  @IsDefined()
  @IsUUID()
  createdBy: string;
}
