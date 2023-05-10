import { IsOptional, IsString } from 'class-validator';

export class GetTagDto {
  @IsString()
  @IsOptional()
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

  @IsString()
  @IsOptional()
  type: string;
}
