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
export class TagEntity {
  /**
   * id
   * @type {string}
   * @memberof TagEntity
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * name
   * @type {string}
   * @memberof TagEntity
   */
  @Column({ type: 'text', nullable: false })
  name: string;

  /**
   * type
   * @type {string}
   * @memberof TagEntity
   */
  @Column({ type: 'text', nullable: false })
  type: string;

  /**
   *resource
   * @type {string}
   * @memberof TagEntity
   */
  @Column({ nullable: true })
  resource?: string;

  /**
   * resourceId
   * @type {string}
   * @memberof TagEntity
   */
  @Column({ nullable: true })
  resourceId?: string;

  /**
   * resourceType
   * @type {string}
   * @memberof TagEntity
   */
  @Column({ nullable: true })
  resourceType?: string;

  /**
   * conditions
   * @type {TagConditions[]}
   * @memberof TagEntity
   */
  @IsObject()
  @Column({ type: 'jsonb', nullable: true, default: [] })
  conditions?: TagConditions[];

  /**
   * isStatic
   * @type {Boolean}
   * @memberof TagEntity
   */
  @Column({ default: true, nullable: false })
  isStatic: boolean;

  /**
   * slug
   * @type {string}
   * @memberof TagEntity
   */
  @Column({ type: 'text', nullable: false })
  slug: string;

  /**
   * createdTa
   * @type {Date}
   * @memberof TagEntity
   */
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt?: Date;

  /**
   * createdBy
   * @type {UUID}
   * @memberof TagEntity
   */
  @Column({ type: 'text', nullable: false })
  createdBy: string;

  /**
   * updatedAt
   * @type {Date}
   * @memberof TagEntity
   */
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt?: Date;

  /**
   * updateBy
   * @type {UUID}
   * @memberof TagEntity
   */
  @Column({ type: 'text', nullable: false })
  updatedBy: string;

  /**
   * deletedAt
   * @type {Date}
   * @memberof TagEntity
   */
  @DeleteDateColumn()
  deletedAt?: Date;
}
