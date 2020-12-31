import React from 'react'
import { CoursePart } from '../index'

interface Part {
  part: CoursePart
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<Part> = ({ part }) => {
  switch(part.name) {
    case "Fundamentals": {
      return <div>{ part.name } { part.exerciseCount} { part.description }</div>
    }
    case "Using props to pass data": {
      return <div>{ part.name} { part.exerciseCount} { part.groupProjectCount } </div>
      break
    }
    case "Deeper type usage": {
      return <div>{ part.name} { part.exerciseCount} { part.description } { part.exerciseSubmissionLink } </div>
      break;
    }
    case "Creating beautiful user interfaces": {
      return <div> { part.name } { part.exerciseCount} { part.description } { part.estimatedHours }</div>
      break;
    }
    default: 
      return assertNever(part);
  }
}

export default Part
