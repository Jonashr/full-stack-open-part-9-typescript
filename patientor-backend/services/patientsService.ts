import patientData from '../data/patients';
import { Patient, NonSensitivePatientEntry, NewPatient, Entry } from '../types';
import * as uuid from 'uuid';

const patients: Array<Patient> = patientData;

const getNonSensitivePatientEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const getData = (): Array<Patient> => {
  return patients;
};

const addPatient = ( entry: NewPatient): Patient => {
  const newPatientEntry = {
    id: uuid.v4(),
    ...entry,
    entries: []
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const getPatientById = (id: string): Patient | undefined => {
  const patient = patients.find(patient => patient.id === id);
  return patient;
};

const addNewEntry = (id: string, entry: Entry): Entry => {
  const patient = patients.find(patient => patient.id === id);

  if(!patient) {
    throw new Error('Patient does not exist.');
  }

  patient.entries.push(entry);

  return entry;
};

export default { 
  getData,
  getNonSensitivePatientEntries,
  getPatientById,
  addNewEntry,
  addPatient
};