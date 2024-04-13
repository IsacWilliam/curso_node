import { AppException } from "./app-exceptions"

export class BadRequestException extends AppException{
    constructor(message: string){
        super(message, 400);
    }
}
