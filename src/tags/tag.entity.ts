import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { tagConditions } from "./tagConditions.dto";
import { v4 as uuidv4 } from 'uuid';

@Entity("tags")
export class Tag {
    
    /**
     * id
     * @type {string}
     * @memberof AbstractEntity
     */
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: false })
    name: string;

    @Column({ nullable: true})
    resource?: string;

    @Column({ nullable: true})
    resourceId?: string;

    @Column({ nullable: true})
    resourceType?: string;

    @Column({type:'jsonb', nullable: true})
    conditions?: tagConditions;

    @Column({ type: 'text', nullable: false })
    type: string;

    @Column({ default: true, nullable: false})
    isStatic: boolean;

    @Column({ type: 'text', nullable: false })
    slug: string;

    /**
     * createdAt
     * @type {Date}
     * @memberof AbstractEntity
     */
    @CreateDateColumn({
        type: 'timestamp',
        name: 'created_at',
    })
    createdAt?: Date;

    @Column({ type: 'text', nullable: false })
    createdBy: string;

    /**
     * updatedAt
     * @type {Date}
     * @memberof AbstractEntity
     */
    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_at',
    })
    updatedAt?: Date;

    @Column({ type: 'text', nullable: false })
    updatedBy: string;


    /**
     * deletedAt
     * @type {Date}
     * @memberof AbstractEntity
     */
    @DeleteDateColumn()
    deletedAt?: Date;

    public static createSlug(dto: any): string {
        const name: string = dto.name != null ? dto.name + '-' : '';
        const type: string = dto.type != null ? dto.type + '-' : '';
        const resourceId: string = dto.resourceId != null ? dto.resourceId + '-' : '';
        const resourceType: string = dto.resourceType != null ? dto.resourceType + '-' : '';
        const resource: string = dto.resource != null ? dto.resource + '-' : '';
        return name + type + resource + resourceType + resourceId + uuidv4();;
    }
}

