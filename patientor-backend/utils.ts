/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender, Entry, NewBaseEntry, Diagnosis, HealthCheckRating, Discharge, SickLeave, OccupationalHealthCareEntry } from './types';
import * as uuid from 'uuid';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const toNewPatient = (patient: any): NewPatient => {
  return {
    name: parseGenericString(patient.name, 'name'),
    dateOfBirth: parseDate(patient.dateOfBirth, 'dateOfBirth'),
    ssn: parseGenericString(patient.ssn, 'ssn'),
    gender: parseGender(patient.gender),
    occupation: parseGenericString(patient.occupation, 'occupation'),
    entries: []
  };

};

const toNewBaseEntry = (entry: any): NewBaseEntry => {
  const baseEntry: NewBaseEntry = {
    description: parseGenericString(entry.description, 'description'),
    date: parseDate(entry.date, 'entryDate'),
    specialist: parseGenericString(entry.specialist, 'specialist'),
    type: parseType(entry),
  };

  if(entry.diagnosisCodes) {
    baseEntry.diagnosisCodes = parseDiagnosisCodes(entry.diagnosisCodes);
  }

  return baseEntry;
};

export const toNewEntry = (entry: any): Entry => { 
  const baseEntry = toNewBaseEntry(entry) as Entry;
  
  switch(baseEntry.type) {
    case "Hospital": {
      return {
        ...baseEntry,
        id: uuid.v4(),
        discharge: parseDischarge(entry.discharge)
      };
    }
    case "OccupationalHealthcare": {
      const occupationalHealthcare: OccupationalHealthCareEntry = {
        ...baseEntry,
        id: uuid.v4(),
        employerName: parseGenericString(entry.employerName, 'employerName')
      };
      
      if(entry.sickLeave) {
        occupationalHealthcare.sickLeave = parseSickLeave(entry.sickLeave);
      }

      return occupationalHealthcare;
    }
    case "HealthCheck": {
      return {
        ...baseEntry,
        id: uuid.v4(),
        healthCheckRating: parseHealthCheckRating(entry.healthCheckRating)
      };
    }
    default: {
      return assertNever(baseEntry);
    }
  }
};

const parseDiagnosisCodes = (diagnosisCodes: any): Array<Diagnosis["code"]> => {  
  if(!Array.isArray(diagnosisCodes) || diagnosisCodes.some(code => !isString(code))) {
    throw new Error('Diagnosis codes should be an array of strings');
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return diagnosisCodes;
};

const parseType = (entry: Entry): string => {
  switch(entry.type) {
    case "Hospital": {
      return entry.type;
    }
    case "OccupationalHealthcare": {
      return entry.type;
    }
    case "HealthCheck": {
      return entry.type;
    }
    default: {
      return assertNever(entry);
    }
  }
};


const parseGender = (gender: any): Gender => {
  if(!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender ${gender as string}`);
  }
  return gender;
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if(!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error(`Incorrect or missing value for healthCheckRating`);
  }
  return healthCheckRating;
};

const parseDischarge = (discharge: any): Discharge => {
  if(!discharge) {
    throw new Error(`Missing field discharge`);
  }

  return {
    date: parseDate(discharge.date, 'discharge date'),
    criteria: parseGenericString(discharge.criteria, 'discharge criteria')
  };
};

const parseSickLeave = (sickLeave: any): SickLeave => {
  return {
    startDate: parseDate(sickLeave.startDate, 'Sick leave startDate'),
    endDate: parseDate(sickLeave.endDate, 'Sick leave endDate')
  };
};

const parseGenericString = (value: string, fieldName: string): string => {
  if(!value || !isString(value)) {
    throw new Error(`${fieldName} is incorrect`);
  }

  return value;
};

const parseDate = (date: any, fieldName: string): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date ${date as string} for field ${fieldName}`);
  }
  return date;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate =(date: string): boolean => {
  return Boolean(Date.parse(date));
};

