import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { TagConditions } from './tagConditions.dto';

export class CreateTagDto {
  /**
   * name
   * @type {string}
   * @memberof CreateTagDto
   */
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty({
    description: 'name of tag',
    type: String,
    required: true,
    example: 'revenue',
  })
  name: string;

  /**
   * resource
   * @type {string}
   * @memberof CreateTagDto
   */
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'name of resource',
    type: String,
    required: false,
    example: 'bank',
  })
  resource?: string;

  /**
   * resourceId
   * @type {string}
   * @memberof CreateTagDto
   */
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'name of resourceId',
    type: String,
    required: false,
    example: 'T001',
  })
  resourceId?: string;

  /**
   * resourceType
   * @type {string}
   * @memberof CreateTagDto
   */
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'name of resourceType',
    type: String,
    required: false,
    example: 'GST',
  })
  resourceType?: string;

  /**
   * conditions
   * @type {TagConditions[]}
   * @memberof CreateTagDto
   */
  @IsOptional()
  @ApiPropertyOptional({
    description: 'tag conditions',
    type: Array,
    isArray: true,
    required: false,
    example: [
      {
        field: 'description',
        keywords: [
          'Amazon Vendor Central',
          'Amazon Wholesale',
          'Apple',
          'Cash Deposit',
        ],
        condition: 'contains',
      },
    ],
  })
  conditions?: TagConditions[];

  /**
   * type
   * @type {string}
   * @memberof CreateTagDto
   */
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty({
    description: 'type of tag',
    type: String,
    required: true,
    example: 'category',
  })
  type: string;

  /**
   * createdBy
   * @type {UUID}
   * @memberof CreateTagDto
   */
  @IsDefined()
  @IsUUID()
  @ApiProperty({
    description: 'identifier of tag creator',
    type: UUID,
    required: true,
    example: '6ebb0c45-f709-44a6-9fd9-476d1c9484e9',
  })
  createdBy: string;
}
