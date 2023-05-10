import { IsDefined, IsString } from 'class-validator';

export class CreatedByDto {
  @IsDefined()
  @IsString()
  createdBy: string;
}
