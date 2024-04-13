import { AppException } from "./app-exceptions";

export class InternalServerErrorException extends AppException{
    constructor(){
        super('Internal Server Error', 500);
    }
}
