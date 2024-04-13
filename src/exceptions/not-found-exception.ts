import { AppException } from "./app-exceptions";

export class NotFoundException extends AppException{
    constructor(entity: string){
        super(`${entity} not found`, 404);
    }
}