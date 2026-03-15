// Mock user for development - replaces Base44 auth
const mockUser = {
  id: 'mock_admin',
  full_name: 'Admin User',
  email: 'admin@bonat.sa',
  role: 'admin',
  sales_rep_id: null,
};

export const base44 = {
  auth: {
    me: async () => mockUser,
    logout: async () => {
      window.location.href = '/';
    },
    redirectToLogin: () => {
      window.location.href = '/';
    },
  },
  appLogs: {
    logUserInApp: async () => {},
  },
};
