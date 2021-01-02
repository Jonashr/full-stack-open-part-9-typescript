import React from 'react';
import { HospitalEntry } from '../types';
import { Card, Icon } from 'semantic-ui-react';


const HospitalDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <Card fluid color='red'>
      <Card.Content>
        <Card.Header>{ entry.date}  <Icon name="hospital outline" size="large"/></Card.Header>
        <Card.Meta>{entry.description}</Card.Meta>
        { entry.discharge && 
          <>
            <Card.Description><strong>Discharge:</strong></Card.Description>
            <Card.Description>
              Date: { <strong>{entry.discharge.date}</strong> }
            </Card.Description>
            <Card.Description>
              Given conditions: { entry.discharge.criteria }
            </Card.Description>
          </>
        }
      </Card.Content>
    </Card>
  );
};

export default HospitalDetails;