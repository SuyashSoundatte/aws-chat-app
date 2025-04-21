import { Router } from "express";

import { registerUsers, loginUsers } from "../middlewares/user.middlewares";
import { loginUser, registerUser, guestLogin } from "../controllers/user.controllers";

const router = Router();

router.route('/register').post(registerUsers, registerUser);
router.route('/login').post(loginUsers, loginUser);
router.route('/guestLogin').get(guestLogin);

export default router;