export interface User {
  id: string;
  username: string;
  grade: string;
  progress: {
    [topic: string]: number;
  };
}
