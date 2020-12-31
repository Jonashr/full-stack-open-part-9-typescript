import React  from "react";
import { Patient, Entry } from '../types';
import { useStateValue } from '../state';

interface Props {
  patient: Patient | undefined;
}

const PatientInfoPage: React.FC<Props> = ({ patient }) => {
  const [{ diagnosis }, dispatch] = useStateValue();


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
          <div key={entry.id}>
            <p>{entry.date} {entry.description}</p>

            <ul>
              {entry.diagnosisCodes?.map(code => {
                return (diagnosis[code] !== undefined ?
                  <li key={code}>{ diagnosis[code].code } {diagnosis[code].name }</li>

                  :

                  <li key={code}>{code}</li>
                );
              })}
            </ul>
          </div>
      ))
      }
    </div>
  );
};

export default PatientInfoPage;