import {Router} from "express";
import {CreateUserController} from './controller/CreateUserController';
import {CreateTagController} from "./controller/CreateTagController";
import { EnsureAdmin } from "./middlewares/ensureAdmin";
import { AuthUserController } from "./controller/AuthUserController";
import { CreateComplimentController } from "./controller/CreateComplimentController";
import { EnsureAuth } from "./middlewares/ensureAuth";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authUserController = new AuthUserController();
const createComplimentController = new CreateComplimentController();

router.post("/users" , createUserController.handle);
router.post("/tags", EnsureAuth , EnsureAdmin, createTagController.handle);
router.post("/login", authUserController.handle);
router.post("/compliment", EnsureAuth ,createComplimentController.handle);

export {router};