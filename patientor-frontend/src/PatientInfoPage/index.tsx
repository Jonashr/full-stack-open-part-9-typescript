import React  from "react";
import { Patient, Entry } from '../types';
import EntryDetails from "./EntryDetails";

interface Props {
  patient: Patient | undefined;
}

const PatientInfoPage: React.FC<Props> = ({ patient }) => {
  if(!patient) {
    return null;
  }

  const entries = patient.entries;

  return (
    <div>
      <h2>
        { patient.name } { patient.gender }
      </h2>
      <div>
        SSN: { patient.ssn }
      </div>
      <div>
        Occupation: { patient.occupation }
      </div>
      <div>
        Date of Birth: { patient.dateOfBirth }
      </div>

      <h3>Entries</h3>
      { Object.values(entries).map((entry: Entry) => (
        <>
        <EntryDetails 
          key={entry.id}
          entry={entry}
        />
        </>
      ))
      }
    </div>
  );
};

export default PatientInfoPage;