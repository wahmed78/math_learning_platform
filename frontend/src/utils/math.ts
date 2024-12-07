export const calculatePercentage = (correct: number, total: number): number => {
  return (correct / total) * 100;
};

export const roundToDecimal = (num: number, places: number = 2): number => {
  return Number(Math.round(Number(num + 'e' + places)) + 'e-' + places);
};

export const generateRandomProblem = (
  min: number,
  max: number,
  operator: '+' | '-' | '*' | '/'
): { problem: string; answer: number } => {
  const num1 = Math.floor(Math.random() * (max - min + 1)) + min;
  const num2 = Math.floor(Math.random() * (max - min + 1)) + min;
  
  let answer: number;
  let problem: string;

  switch(operator) {
    case '+':
      answer = num1 + num2;
      problem = `${num1} + ${num2}`;
      break;
    case '-':
      answer = num1 - num2;
      problem = `${num1} - ${num2}`;
      break;
    case '*':
      answer = num1 * num2;
      problem = `${num1} × ${num2}`;
      break;
    case '/':
      answer = num1;
      problem = `${num1 * num2} ÷ ${num2}`;
      break;
  }

  return { problem, answer };
};
