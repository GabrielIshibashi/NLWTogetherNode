import {Request, Response, NextFunction} from "express";
import {verify} from "jsonwebtoken";

interface Ipayload {
    sub: string;

}

export function EnsureAuth(request: Request, response: Response, next: NextFunction){
    
    const authToken = request.headers.authorization;


    const [, token] = authToken.split(" ")

    if(!authToken){ 
        return response.status(401).end();
    }

    try{
        const {sub}  = verify(token, "h89hf893h98jd9jdiowjdiowjd90") as Ipayload;
    
        request.user_id = sub;

        return next();
    }catch(err){
        return response.status(401).end();
    }
    


    

}