import express from 'express';
import patientsService from '../services/patientsService';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_, response) => {
  response.send(patientsService.getNonSensitivePatientEntries());
});

router.post('/', (request, response) => {
  const newPatient = toNewPatient(request.body);
  
  const addedPatient = patientsService.addPatient(newPatient);
  
  response.json(addedPatient);
});

router.get('/:id', (request, response) => {
  response.send(patientsService.getPatientById(request.params.id));
});

export default router;