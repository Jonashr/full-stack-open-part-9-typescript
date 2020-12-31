
import { calculateExerciseScore } from './calculateExerciseScore';

interface ExerciseInput {
  exerciseHours: Array<number>,
  target: number
}

const parseArgumentsExerciseInput = (args: Array<string>): ExerciseInput => {
  if(args.length < 4) throw new Error('Not enough arguments, (exerciseHours: Array<number>, target: number)');

  const hourArguments = args.slice(2, -1);
  const lastIndexValue = args[args.length -1];

  if(hourArguments.find(hours => isNaN(Number(hours))) || isNaN(Number(lastIndexValue))) {
    throw new Error('Provided an invalid value');
  }

  const exerciseHours = hourArguments.map(hours => Number(hours));
  const target = Number(lastIndexValue);

  return {
    exerciseHours,
    target
  };
};

try {
  console.log('Calculating exercise score using hardcoded values', calculateExerciseScore([3, 0, 2, 4.5, 0, 3, 1], 2));
  const args = parseArgumentsExerciseInput(process.argv);
  console.log('Attempting to calculate exercise score using cli args');
  console.log(calculateExerciseScore(args.exerciseHours, args.target));
} catch(error) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('Error occured', error.message);
}