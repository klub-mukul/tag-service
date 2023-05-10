import { ApiProperty } from '@nestjs/swagger';

export class TagConditions {
  /**
   * field
   * @type {string}
   * @memberof TagConditions
   */
  @ApiProperty({
    description: 'field of one of conditions of a tag',
    type: String,
    required: true,
    example: 'description',
  })
  field: string;

  /**
   * condition
   * @type {string}
   * @memberof TagConditions
   */
  @ApiProperty({
    description: 'condition of one of conditions of a tag',
    type: String,
    required: true,
    example: 'contains',
  })
  condition: string;

  /**
   * keywords
   * @type {string[]}
   * @memberof TagConditions
   */
  @ApiProperty({
    description: 'keywords of one of conditions of a tag',
    type: Array,
    isArray: true,
    required: true,
    example: [
      'Amazon Vendor Central',
      'Amazon Wholesale',
      'Apple',
      'Cash Deposit',
    ],
  })
  keywords: string[];
}
