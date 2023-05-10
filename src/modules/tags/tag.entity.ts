import { IsObject } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TagConditions } from './dto/tagConditions.dto';

@Entity('tag')
export class Tag {
  /**
   * id
   * @type {string}
   * @memberof Tag
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * name
   * @type {string}
   * @memberof Tag
   */
  @Column({ type: 'text', nullable: false })
  name: string;

  /**
   * type
   * @type {string}
   * @memberof Tag
   */
  @Column({ type: 'text', nullable: false })
  type: string;

  /**
   *resource
   * @type {string}
   * @memberof Tag
   */
  @Column({ nullable: true })
  resource?: string;

  /**
   * resourceId
   * @type {string}
   * @memberof Tag
   */
  @Column({ nullable: true })
  resourceId?: string;

  /**
   * resourceType
   * @type {string}
   * @memberof Tag
   */
  @Column({ nullable: true })
  resourceType?: string;

  /**
   * conditions
   * @type {TagConditions[]}
   * @memberof Tag
   */
  @IsObject()
  @Column({ type: 'jsonb', nullable: true, default: [] })
  conditions?: TagConditions[];

  /**
   * isStatic
   * @type {Boolean}
   * @memberof Tag
   */
  @Column({ default: true, nullable: false })
  isStatic: boolean;

  /**
   * slug
   * @type {string}
   * @memberof Tag
   */
  @Column({ type: 'text', nullable: false })
  slug: string;

  /**
   * createdTa
   * @type {Date}
   * @memberof Tag
   */
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt?: Date;

  /**
   * createdBy
   * @type {UUID}
   * @memberof Tag
   */
  @Column({ type: 'text', nullable: false })
  createdBy: string;

  /**
   * updatedAt
   * @type {Date}
   * @memberof Tag
   */
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt?: Date;

  /**
   * updateBy
   * @type {UUID}
   * @memberof Tag
   */
  @Column({ type: 'text', nullable: false })
  updatedBy: string;

  /**
   * deletedAt
   * @type {Date}
   * @memberof tag
   */
  @DeleteDateColumn()
  deletedAt?: Date;
}
