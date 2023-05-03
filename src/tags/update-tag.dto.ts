import { PartialType } from '@nestjs/mapped-types';
import { CreateTagDto } from './create-tag.dto';
import { IsBoolean, IsDefined, IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateTagDto extends PartialType(CreateTagDto) {
    
    @IsString()
    name: string;

    @IsString()
    resource : string;

    @IsString()
    resourceId: string;

    @IsString()
    resourceType: string;

    conditions?: object;

    @IsString()
    type: string;

    @IsBoolean()
    is_static: boolean;
}
