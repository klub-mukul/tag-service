import { IsString } from 'class-validator';

export class GetTagDto {
  @IsString()
  name: string;

  @IsString()
  resource: string;

  @IsString()
  resourceId: string;

  @IsString()
  resourceType: string;

  @IsString()
  type: string;
}
