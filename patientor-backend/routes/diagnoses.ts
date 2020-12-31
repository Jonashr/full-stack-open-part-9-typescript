import express from 'express';
import diagnosisService from '../services/diagnosisService';

const router = express.Router();

router.get('/', (_, response) => {
  response.send(diagnosisService.getData());
});

export default router;