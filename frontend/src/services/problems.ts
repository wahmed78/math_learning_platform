export const problemsService = {
  async getProblems(params: {
    grade: string;
    topic: string;
    difficulty: string;
  }) {
    const { data } = await api.get('/problems', { params });
    return data;
  },

  async checkSolution(problemId: string, answer: string) {
    const { data } = await api.post(`/problems/${problemId}/check`, { answer });
    return data;
  },

  async getHint(problemId: string) {
    const { data } = await api.get(`/problems/${problemId}/hint`);
    return data;
  }
};