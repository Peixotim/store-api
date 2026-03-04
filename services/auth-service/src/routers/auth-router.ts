import { Router } from "express";
import { AuthController } from "../controllers/auth-controller";
import { validateBody } from "../middlewares/validate-body";
import { LoginPayload } from "../dtos/login-payload";
import { RegisterPayload } from "../dtos/register-payload";

const router: Router = Router();
const controller = new AuthController();

router.post('/login', validateBody(LoginPayload), controller.login.bind(controller));
router.post('/register', validateBody(RegisterPayload), controller.register.bind(controller));
router.post('/refresh', controller.refresh.bind(controller));
router.get('/health', controller.health.bind(controller));

export {router as authRouter}