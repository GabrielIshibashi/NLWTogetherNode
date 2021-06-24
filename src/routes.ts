import {Router} from "express";
import {CreateUserController} from './controller/CreateUserController';
import {CreateTagController} from "./controller/CreateTagController";
import { EnsureAdmin } from "./middlewares/ensureAdmin";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();

router.post("/users" , createUserController.handle);
router.post("/tags",EnsureAdmin, createTagController.handle);

export {router};