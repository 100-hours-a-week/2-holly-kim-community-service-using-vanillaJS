const API_BASE = "https://api.example.com";

export const ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE}/auth/login`,
    REGISTER: `${API_BASE}/auth/register`,
  },
  USERS: {
    PROFILE: `${API_BASE}/users/profile`,
    PASSWORD: `${API_BASE}/users/password`,
  },
  POSTS: {
    LIST: `${API_BASE}/posts`,
    CREATE: `${API_BASE}/posts`,
    EDIT: (postId) => `${API_BASE}/posts/${postId}`,
    DETAIL: (postId) => `${API_BASE}/posts/${postId}`,
  },
  MEDIA: {
    IMAGES: `${API_BASE}/media/images`,
  },
};
