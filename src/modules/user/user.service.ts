import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUsers = async () =>{
    return prisma.user.findMany();
};

export const createUser = async (body) =>{
    //console.log('body: ', body);
    return prisma.user.create({
        data: body});
};
