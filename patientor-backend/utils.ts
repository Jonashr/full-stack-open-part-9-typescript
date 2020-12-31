/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender } from './types';

export const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: []
  };

};

const parseName = (name: any): string => {
  if(!name || !isString(name)) {
    throw new Error('Name is incorrect');
  }
  return name;
};

const parseGender = (gender: any): Gender => {
  if(!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender ${gender as string}`);
  }
  return gender;
};

const parseSSN = (ssn: any): string => {
  if(!ssn || !isString(ssn)) {
    throw new Error('Ssn is incorrect');
  }
  return ssn;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseOccupation = (occupation: any): string => {
  if(!occupation || !isString(occupation)) {
    throw new Error('Occupation is incorrect');
  }
  return occupation;
};


const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate =(date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date ${date as string}`);
  }
  return date;
};