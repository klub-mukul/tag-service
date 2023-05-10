import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TagConditions } from './dto/tagConditions.dto';
import { IsObject } from 'class-validator';

@Entity('tags')
export class Tag {
  /**
   * id
   * @type {string}
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * name
   * @type {string}
   */
  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  type: string;

  @Column({ nullable: true })
  resource?: string;

  @Column({ nullable: true })
  resourceId?: string;

  @Column({ nullable: true })
  resourceType?: string;

  @IsObject()
  @Column({ type: 'jsonb', nullable: true, default: [] })
  conditions?: TagConditions[];

  @Column({ default: true, nullable: false })
  isStatic: boolean;

  @Column({ type: 'text', nullable: false })
  slug: string;

  /**
   * createdAt
   * @type {Date}
   */
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt?: Date;

  @Column({ type: 'text', nullable: false })
  createdBy: string;

  /**
   * updatedAt
   * @type {Date}
   */
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt?: Date;

  @Column({ type: 'text', nullable: false })
  updatedBy: string;

  /**
   * deletedAt
   * @type {Date}
   */
  @DeleteDateColumn()
  deletedAt?: Date;
}
