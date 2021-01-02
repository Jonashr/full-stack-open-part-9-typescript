import React from 'react';
import { Entry } from '../types';
import HealthCheckDetails from './HealthCheckDetails';
import HospitalDetails from './HospitalDetails';
import OccupationalHealthCareDetails from './OccupationalHealthcareDetails';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry}> = ({ entry }) => {

  switch(entry.type) {
    case "Hospital": {
      return <HospitalDetails entry={entry} />;
    }
    case "OccupationalHealthcare": {
      return <OccupationalHealthCareDetails entry={entry} />;
    }
    case "HealthCheck": {
      return <HealthCheckDetails entry={entry} />;
    }
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
