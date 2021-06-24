import { EntityRepository, Repository} from "typeorm";
import { Tag } from "../entity/Tags";
@EntityRepository(Tag)
class TagsRepositories extends Repository<Tag> {

}

export {TagsRepositories};