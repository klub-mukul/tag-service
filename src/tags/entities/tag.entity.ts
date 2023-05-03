import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tags")
export class Tag {
    @Column({ primary: true })
    id: string;

    @Column()
    name: string;

    @Column()
    resource : string;

    @Column()
    resourceId: string;

    @Column()
    resourceType: string;

    @Column('jsonb', {nullable: true})
    conditions?: object;

    @Column()
    type: string;

    @Column({ default: true})
    is_static: boolean;

    @Column()
    slug: string;

    @Column({type:'timestamptz'})
    createdAt: Date;

    @Column()
    createdBy: string;

    @Column({type:'timestamptz'})
    updatedAt: Date;

    @Column()
    updatedBy: string;

    @Column({type:'timestamptz'})
    deletedAt: Date;
}
