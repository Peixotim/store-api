import { Router } from 'express';
import { UserController } from '../controllers/user-controller';
import { validate } from '../middlewares/validate';
import {
  createUserSchema,
  idParamSchema,
  emailParamSchema,
  cpfParamSchema,
} from '../dtos/user-schema';

const router : Router = Router();
const controller = new UserController();

router.post(
  '/',
  validate(createUserSchema, 'body'),
  controller.create.bind(controller)
);

router.get('/health',
  controller.health.bind(controller)
);

router.get(
  '/',
  controller.findAll.bind(controller)
);

router.get(
  '/id/:id',
  validate(idParamSchema, 'params'),
  controller.findById.bind(controller)
);

router.get(
  '/email/:email',
  validate(emailParamSchema, 'params'),
  controller.findByEmail.bind(controller)
);

router.get('/existsByEmail',
  validate(emailParamSchema,'query'),
  controller.existsByEmail.bind(controller)
);

router.get('/existsByCpf',
  validate(cpfParamSchema,'query'),
  controller.existsByCpf.bind(controller)
);

router.get(
  '/cpf/:cpf',
  validate(cpfParamSchema, 'params'),
  controller.findByCpf.bind(controller)
);

router.patch(
  '/desactive/:id',
  validate(idParamSchema, 'params'),
  controller.desactive.bind(controller)
);


export default router;