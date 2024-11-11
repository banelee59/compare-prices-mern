import express from 'express';
import { someControllerFunction } from '../controllers/importController.js';

const router = express.Router();

router.route('/').get(someControllerFunction);

export default router; 