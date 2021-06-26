import { UsersRepositories } from "../repositories/UsersRepositories";
import {getCustomRepository} from "typeorm";
import {hash} from "bcryptjs";

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
    password: string;

}
/* Regras de negócio para a criação de usuário, se o email já existir ele não irá retornar nada,
se o email não existir criar usuário no banco de dados
*/
class CreateUserService{
    async execute({name,email,admin,password} : IUserRequest){
        const usersRepositories = getCustomRepository (UsersRepositories) ;

        if(!email){
            throw new Error("Email incorrect")
        }

        const userAlreadyExists = await usersRepositories.findOne({
            email
        });

        const passwordHash = await hash(password, 8)

        if(userAlreadyExists){
            throw new Error("User already exists");
        }

        const user = usersRepositories.create({
            name,
            email,
            admin,
            password: passwordHash,
        })

        await usersRepositories.save(user);

        return user;
    }
}

export {CreateUserService};