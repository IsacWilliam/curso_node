import { PrismaClient } from '@prisma/client';
import { UserModel } from './user.model';
import { UserInsertDTO } from './dtos/user-insert.dto';
import { NotFoundException } from '@exceptions/not-found-exception';
import { BadRequestException } from '@exceptions/bad-request-exception';
import { createPasswordHashed } from '@utils/password';
import { UserEditPasswordDTO } from './dtos/user-edit-password.dto';


const prisma = new PrismaClient();

export const getUsers = async (): Promise<UserModel[]> =>{
    const users = await prisma.user.findMany();
    
    if(users?.length === 0){
        throw new NotFoundException('User');
    }

    return users;
};

export const getUserByEmail =async (email: string): Promise<UserModel> => {
    const user = await prisma.user.findFirst({
        where: {
            email
        }
    });
    
    if(!user){
        throw new NotFoundException('User');
    }

    return user;
};

export const getUserByCpf = async (cpf: string): Promise<UserModel> => {
    const user = await prisma.user.findFirst({
        where: {
            cpf
        }
    });

    if(!user){
        throw new NotFoundException('User');
    }

    return user;
}

export const createUser = async (body: UserInsertDTO): Promise<UserModel> =>{
    
    const userEmail = await getUserByEmail(body.email).catch(() => undefined);
    if(userEmail){
        throw new BadRequestException('Email exist in DB');
    }
    
    const userCpf = await getUserByCpf(body.cpf).catch(() => undefined);
    if(userCpf){
        throw new BadRequestException('CPF exist in DB');
    }

    const user: UserInsertDTO = {
        ...body,
        password: await createPasswordHashed(body.password)
    }

    return prisma.user.create({
        data: user
    });
};

export const getUserById = async (userId: number): Promise<UserModel> =>{
    const user = await prisma.user.findFirst({
        where: {
            id: userId
        }
    });

    if(!user){
        throw new NotFoundException('User');
    }

    return user;
};


export const editPassword = async (userId: number, userEditPasswordDTO: UserEditPasswordDTO): Promise<UserModel> => {
    const user = await getUserById(userId);
    const newUser = {
        ...user,
        password: await createPasswordHashed(userEditPasswordDTO.password)
    }

    return prisma.user.update({
        where: {id: userId},
        data: newUser
    })
};
