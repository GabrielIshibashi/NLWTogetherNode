import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import {compare, hash} from "bcryptjs";

import {sign} from "jsonwebtoken";

interface IAuthenticateRequest{
    email: string;
    password: string;
}

class AuthUserService {

    async execute({email, password} : IAuthenticateRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories)
        
        const userExists = await usersRepositories.findOne({
            email
        });
        
        if(!userExists){
            throw new Error("Email/Password incorrect!");
        }

        const passwordMatch = await compare(password, userExists.password);
        
        if(!passwordMatch){
            throw new Error("Email/Password incorrect!");
        }
    
        const token = sign({
            email: userExists.email  
        }, "h89hf893h98jd9jdiowjdiowjd90", {
            subject: userExists.id,
            expiresIn: "1d"
        });

        return token;
    }

}   

export {AuthUserService};