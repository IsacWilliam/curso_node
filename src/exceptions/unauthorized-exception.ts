import { AppException } from "./app-exceptions";

export class UnauthorizedException extends AppException{
    constructor(){
        super('User without permission');
    }
}
