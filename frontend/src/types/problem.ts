export interface ProblemType {
  id: string;
  question: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  visualAid?: string;
  hints?: string[];
}

export interface SolutionType {
  steps: string[];
  explanation?: string;
  hints?: string[];
}