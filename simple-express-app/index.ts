import express from 'express';
import { calculateBmi } from './calculateBmi';
import { calculateExerciseScore } from './calculateExerciseScore';
const app = express();
app.use(express.json());

app.get('/hello', (_, res) => {
  res.send('Hello!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if(!height || !weight) {
    return res.status(404).json({ message: 'Missing arguments'});
  }

  if(!isNaN(Number(height)) || !isNaN(Number(weight))) {
    const bmi = calculateBmi(Number(height), Number(weight));
    return res.status(200).json(bmi);
  } else {
    return res.status(404).json({ message: 'Arguments are not valid numbers'});
  }
});

interface ExerciseArguments {
  daily_exercises: Array<number>,
  target: number
}

app.post('/exercises', (req, res) => {
  const { daily_exercises , target} = req.body as ExerciseArguments;

  console.log('Daily exercises, target', daily_exercises, target);

  if(!daily_exercises || !target) {
    return res.status(404).json({ error: 'Parameters missing'});
  }

  if(isNaN(target) || daily_exercises.find(exerciseHours => isNaN(exerciseHours))) {
    return res.status(404).json({ error: 'Malformatted parameters'});
  }

  const exerciseHours = daily_exercises.map(hours => Number(hours));

  try {
    const result = calculateExerciseScore(exerciseHours, Number(target));
    return res.json({ result });
  } catch(error) {
    return res.status(400).json({ error: 'An error occured'});
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
