import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Tag } from './../tag.entity';
import { TagConditions } from './tagConditions.dto';

export class ResponseTagDto {
  /**
   * id
   * @type {string}
   * @memberof ResponseTagDto
   */
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'id of tag',
    type: String,
    required: true,
    example: 'e8a5f497-584c-459e-87ca-2f0d5b770405',
  })
  id?: string;

  /**
   * name
   * @type {string}
   * @memberof ResponseTagDto
   */
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'name of tag',
    type: String,
    required: true,
    example: 'revenue',
  })
  name?: string;

  /**
   * type
   * @type {string}
   * @memberof ResponseTagDto
   */
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'type of tag',
    type: String,
    required: true,
    example: 'category',
  })
  type?: string;

  /**
   * resource
   * @type {string}
   * @memberof ResponseTagDto
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
   * @memberof ResponseTagDto
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
   * @memberof ResponseTagDto
   */
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'name of resourceType of tag',
    type: String,
    required: false,
    example: 'GST',
  })
  resourceType?: string;

  /**
   * conditions
   * @type {TagConditions[]}
   * @memberof ResponseTagDto
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
   * isStatic
   * @type {Boolean}
   * @memberof ResponseTagDto
   */
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'is tag static or not',
    type: Boolean,
    required: false,
    example: true,
  })
  isStatic?: boolean;

  /**
   * slug
   * @type {string}
   * @memberof ResponseTagDto
   */
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'slug of tag',
    type: String,
    required: false,
    example:
      'revenue-category-10Bank-GST-T000-4b109a5a-8eaa-4f75-91ae-1735212bb75b',
  })
  slug?: string;

  /**
   * constructor
   * Creates an instance of ResponseTagDto.
   * @param {Tag} tag
   * @type {Tag}
   * @memberof ResponseTagDto
   */
  constructor(tag: Tag) {
    this.id = tag.id;
    this.name = tag.name;
    this.type = tag.type;
    this.resource = tag.resource;
    this.resourceId = tag.resourceId;
    this.resourceType = tag.resourceType;
    this.conditions = tag.conditions;
    this.isStatic = tag.isStatic;
    this.slug = tag.slug;
  }
}
