import { AppException } from "./app-exceptions";

export class InternalServerErrorException extends AppException{
    constructor(message: string){
        super(message);
    }
}
