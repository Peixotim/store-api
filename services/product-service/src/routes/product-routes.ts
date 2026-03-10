import { Router } from 'express';
import { ProductController } from '../controller/product-controller';
import { validate } from '../middlewares/validate';
import { createProduct, findSku, findById } from '../dtos/product-schema';

const router: Router = Router();
const controller = new ProductController();

router.get('/health', controller.health.bind(controller));
router.get('/', controller.findAll.bind(controller));
router.post('/', validate(createProduct, 'body'), controller.create.bind(controller));

router.get('/sku/:sku', validate(findSku, 'params'), controller.findBySku.bind(controller));
router.get('/id/:id', validate(findById, 'params'), controller.findById.bind(controller));
router.get('/exists/:sku', validate(findSku, 'params'), controller.existsInStock.bind(controller));

router.delete(
  '/stock/:sku',
  validate(findSku, 'params'),
  controller.removeInStock.bind(controller),
);

export default router;
