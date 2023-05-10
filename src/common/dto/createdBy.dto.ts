import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

export class CreatedByDto {
  @IsDefined()
  @IsString()
  @ApiProperty({
    description: 'identifier of tag creator',
    type: UUID,
    required: true,
    example: '6ebb0c45-f709-44a6-9fd9-476d1c9484e9',
  })
  createdBy: string;
}
