import express from 'express';
import { getReviewsByItemId } from '../controllers/reviewController.js';

const router = express.Router();

router.get('/item/:itemId', getReviewsByItemId);

export default router;
