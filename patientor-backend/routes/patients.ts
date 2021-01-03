import express from 'express';
import patientsService from '../services/patientsService';
import { toNewPatient, toNewEntry } from '../utils';

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

router.post('/:id/entries', (request, response) => {
  const existingPatient = patientsService.getPatientById(request.params.id);

  if(!existingPatient) {
    return response.status(404).json('Patient not found');
  }

  const newEntry = toNewEntry(request.body);

  const addedEntry = patientsService.addNewEntry(request.params.id, newEntry);

  return response.json(addedEntry);
});

export default router;