import { Router } from "express";
import { AuthController } from "../controllers/auth-controller";
import { validateBody } from "../middlewares/validate-body";
import { LoginPayload } from "../dtos/login-payload";
import { RegisterPayload } from "../dtos/register-payload";

const router: Router = Router();
const controller = new AuthController();

router.post('/login', validateBody(LoginPayload) , controller.login);
router.post('/register', validateBody(RegisterPayload), controller.register);
router.post('/refresh' , controller.refresh);

export {router as authRouter}