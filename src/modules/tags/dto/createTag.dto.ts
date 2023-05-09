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
  resource: string;

  @IsString()
  resourceId: string;

  @IsString()
  resourceType: string;

  @IsOptional()
  conditions?: TagConditions[];

  @IsString()
  @IsDefined()
  type: string;

  @IsDefined()
  @IsUUID()
  createdBy: string;
}
