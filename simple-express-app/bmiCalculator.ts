import { calculateBmi } from './calculateBmi';

interface HeightWeight {
  height: number,
  weight: number
}

const parseArgumentsBmiCalculator = (args: Array<string>): HeightWeight => {
  if(args.length < 4) throw new Error('Not enough arguments');
  if(args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

try {
  console.log('Hardoded BMI values', calculateBmi(180,74));
  const args = parseArgumentsBmiCalculator(process.argv); 
  console.log('BMI Calculator using arguments', calculateBmi(args.height, args.weight));
} catch(error) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('An error occured', error.message);
}