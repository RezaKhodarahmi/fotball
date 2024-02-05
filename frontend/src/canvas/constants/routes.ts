export const API_URL = process.env.API_URL || 'http://localhost:5000';

export const API = {
  CANVAS: {
    upload: `${API_URL}/canvas/upload`,
    list: `${API_URL}/canvas`,
    editor: `${API_URL}/canvas/:id`,
    delete: `${API_URL}/canvas/:id`,
  },
  AUTH: {
    login: `${API_URL}/login`,
    register: `${API_URL}/users/register`,
  }
}