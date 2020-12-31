import diagnosisData from '../data/diagnoses.json';
import { Diagnosis } from '../types';

const diagnoses: Array<Diagnosis> = diagnosisData;

const getData = (): Array<Diagnosis> => {
  return diagnoses;
};

const addDiagnosis = (): null => {
  return null;
};

export default {
  getData,
  addDiagnosis
};