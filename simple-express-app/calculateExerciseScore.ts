interface ExerciseResult {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

export const calculateExerciseScore = (exerciseHours: Array<number>, target: number): ExerciseResult => {
  if(exerciseHours.find(hours => hours < 0)) {
    throw Error('No negative hours allowed');
  } else if(exerciseHours.find(hours => hours > 24)) {
    throw Error('Hours exceed number of hours in a day');
  }

  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter(hours => hours > 0).length;
  const average = exerciseHours.reduce((sum: number, currentValue: number) => { return sum + currentValue; }) / periodLength;
  const success = average >= target;
  const rating = average > target * 1.5 ? 3 : average > target * 0.9 ? 2 : 1;
  const ratingDescription = rating === 1 ? 'You are a failure' : rating === 2 ? 'You did great, but you can do even better.' : 'You are a monster';

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};
