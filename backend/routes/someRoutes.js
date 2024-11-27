import express from 'express';
import { importProducts } from '../controllers/importController.js';

const router = express.Router();

router.get('/products', importProducts);

export default router; 