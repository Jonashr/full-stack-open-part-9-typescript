import React from 'react';
import { Entry } from '../types';
import { useStateValue } from '../state';

const DiagnosisCodes: React.FC<{ entry: Entry}> = ({ entry }) => {
  const [{ diagnosis }] = useStateValue();


  if(!entry.diagnosisCodes) {
    return null;
  }

  const diagnosisCodes = entry.diagnosisCodes;
  
  return (  
    <ul>
      {diagnosisCodes?.map(code => {
        return (diagnosis[code] !== undefined ?
          <li key={code}>{ diagnosis[code].code } {diagnosis[code].name }</li>
  
          :
  
          <li key={code}>{code}</li>
        );
      })}
    </ul>
  );
};

export default DiagnosisCodes;
