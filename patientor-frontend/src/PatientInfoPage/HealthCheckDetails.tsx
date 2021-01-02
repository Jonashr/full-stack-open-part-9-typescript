import React from 'react';
import { HealthCheckEntry } from '../types';
import { Card, Icon } from 'semantic-ui-react';
import HealthRatingBar from '../components/HealthRatingBar';
import DiagnosisCodes from '../components/DiagnosisCodes';

const HealthCheckDetails: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  const rating = entry.healthCheckRating;
  
  return (
    <Card fluid color='green'>
      <Card.Content>
        <Card.Header>{entry.date}<Icon name="user md" size="large" /></Card.Header>
        <Card.Meta>{entry.description}</Card.Meta>
        <Card.Description>
          <HealthRatingBar showText={false} rating={rating} />          
        </Card.Description>
        <Card.Description>
          <DiagnosisCodes entry={entry} />
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default HealthCheckDetails;
