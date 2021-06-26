import { Response , Request} from "express";
import { AuthUserService } from "../services/AuthUserService";


class AuthUserController {
    async handle(request: Request,response: Response){
        const { email, password} = request.body;
        const authUserService = new AuthUserService;

        const token = await authUserService.execute({
            email,
            password
        });

        return response.json(token);
    }
}

export {AuthUserController};