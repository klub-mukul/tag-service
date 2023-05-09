import { HttpException, HttpStatus } from "@nestjs/common";

export class NoTagFoundException extends HttpException{
    constructor(message: string){
        super('No Tag Found with id: '+ message, HttpStatus.NOT_FOUND);
    }
}

// export class ResourceValidationException extends HttpException{
//     constructor(message: string){
//         super(message, HttpStatus.BAD_REQUEST);
//     }
// }