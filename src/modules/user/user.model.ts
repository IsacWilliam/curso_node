export interface UserModel{
    id: number;
    name: string;
    cpf: string;
    email: string;
    password: string;
    typeUser: number;
    phone: string;
    createdAt: Date;
    updatedAt: Date
}
