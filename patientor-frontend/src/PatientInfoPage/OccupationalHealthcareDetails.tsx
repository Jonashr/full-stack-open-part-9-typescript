import React from 'react';
import { OccupationalHealthCareEntry } from '../types';
import { Card, Icon } from 'semantic-ui-react';
import DiagnosisCodes from '../components/DiagnosisCodes';

const OccupationalHealthCareDetails: React.FC<{ entry: OccupationalHealthCareEntry }> = ({ entry }) => {
  return(
    <Card fluid color='blue'>
      <Card.Content>
        <Card.Header>{entry.date}<Icon name='stethoscope' size='large' /></Card.Header>
        <Card.Meta>{entry.description}</Card.Meta>
        { entry.sickLeave &&
          <>
            <Card.Description>
              <strong>Sick leave</strong>
            </Card.Description>
            <Card.Description>
              Start date: {entry.sickLeave.startDate} End date: {entry.sickLeave.endDate}
            </Card.Description>
            <Card.Description>
              <DiagnosisCodes entry={entry} />
            </Card.Description>
          </>
        }
      </Card.Content>
    </Card>
  );
};

export default OccupationalHealthCareDetails;