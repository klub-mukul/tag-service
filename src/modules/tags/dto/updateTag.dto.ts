import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsDefined, IsString, IsUUID } from 'class-validator';
import { CreateTagDto } from './createTag.dto';
import { TagConditions } from './tagConditions.dto';

export class UpdateTagDto extends PartialType(CreateTagDto) {

    @IsString()
    @IsDefined()
    name: string;

    @IsString()
    @IsDefined()
    type: string;

    @IsDefined()
    @IsUUID()
    updatedBy: string;

    @IsString()
    resourceId?: string;

    @IsString()
    resourceType?: string;

    @IsString()
    resource?: string;

    @IsBoolean()
    isStatic?: boolean;

    conditions?: TagConditions[];

}
