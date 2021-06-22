import { Repository, EntityRepository} from "typeorm";
import {User} from "../entity/User"; 

// Acesso aos métodos do repository
@EntityRepository(User)
class UsersRepositories extends Repository<User>{
    
}

export {UsersRepositories};