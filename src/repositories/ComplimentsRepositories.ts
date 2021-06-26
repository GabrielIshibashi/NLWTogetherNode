import {Repository, EntityRepository} from "typeorm";
import { Compliments } from "../entity/Compliments";
import { User } from "../entity/User";

@EntityRepository(Compliments)
class ComplimentsRepositories extends Repository<Compliments>{

}

export {ComplimentsRepositories}