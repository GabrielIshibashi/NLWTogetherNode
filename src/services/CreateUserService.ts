import { UsersRepositories } from "../repositories/UsersRepositories";
import {getCustomRepository} from "typeorm";

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;

}
/* Regras de negócio para a criação de usuário, se o email já existir ele não irá retornar nada,
se o email não existir criar usuário no banco de dados
*/
class CreateUserService{
    async execute({name,email,admin} : IUserRequest){
        const usersRepositories = getCustomRepository (UsersRepositories) ;

        if(!email){
            throw new Error("Email incorrect")
        }

        const userAlreadyExists = await usersRepositories.findOne({
            email
        });

        if(userAlreadyExists){
            throw new Error("User already exists");
        }

        const user = usersRepositories.create({
            name,
            email,
            admin,
        })

        await usersRepositories.save(user);

        return user;
    }
}

export {CreateUserService};