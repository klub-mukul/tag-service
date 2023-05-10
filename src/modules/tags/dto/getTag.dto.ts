import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetTagDto {
  /**
   * name
   * @type {string}
   * @memberof GetTagDto
   */
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'name of tag',
    type: String,
    required: true,
    example: 'revenue',
  })
  name?: string;

  /**
   * resource
   * @type {string}
   * @memberof GetTagDto
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
   * @memberof GetTagDto
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
   * @memberof GetTagDto
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
   * type
   * @type {string}
   * @memberof GetTagDto
   */
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'type of tag',
    type: String,
    required: true,
    example: 'category',
  })
  type?: string;
}
