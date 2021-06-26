import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IComplimentRequest {
    tag_id: string ;
    user_sender: string;
    user_receiver: string;
    message: string;
}

class CreateComplimentsService {
   async execute({tag_id, user_receiver, user_sender, message} : IComplimentRequest){
    const complimentRepositories = getCustomRepository(ComplimentsRepositories);
    const userRepositories = getCustomRepository(UsersRepositories);

    const userReceiverExists = await userRepositories.findOne(user_receiver);

    if(user_sender == user_receiver){
        throw new Error("You can't send to yourself");
    }

    if(!userReceiverExists){
        throw new Error("User receiver doesn't exist");
    }

    const compliment =  complimentRepositories.create({
        tag_id,
        user_receiver,
        user_sender,
        message
    })

    await complimentRepositories.save(compliment);

    return compliment;

    }
}

export {CreateComplimentsService};