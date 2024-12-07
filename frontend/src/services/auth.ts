export const authService = {
  async login(credentials: { username: string; password: string }) {
    const { data } = await api.post('/auth/login', credentials);
    localStorage.setItem('token', data.token);
    return data;
  },

  async logout() {
    localStorage.removeItem('token');
    await api.post('/auth/logout');
  },

  async getCurrentUser() {
    const { data } = await api.get('/auth/me');
    return data;
  }
};
