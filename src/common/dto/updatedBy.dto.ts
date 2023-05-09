import { IsDefined, IsString } from 'class-validator';

export class UpdatedByDto {
  @IsDefined()
  @IsString()
  updatedBy: string;
}
