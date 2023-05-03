import { IsBoolean, IsString } from "class-validator";

export class CreateTagDto {

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
