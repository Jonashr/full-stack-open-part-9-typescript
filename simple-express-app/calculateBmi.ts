export const calculateBmi = (height: number, weight: number) : string => {
  const bmi = weight / (height / 100 * height / 100);
  if(height <= 0 || weight <= 0) {
    throw Error('Invalid numeric values');
  }

  if(bmi >= 30) {
    return `${bmi} - Obese`;
  } else if(bmi >= 25) {
    return `${bmi} - Overweight`;
  } else if(bmi >= 18.5) {
    return `${bmi} - Normal weight`;
  } 
  
  return `${bmi} - Underweight`;
  
};