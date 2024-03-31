// Auth.ts
export const isAuthenticated = (): boolean => {
    // Check if user is authenticated based on your authentication logic
    const userToken = localStorage.getItem('userToken');
    return !!userToken; // Return true if userToken exists, otherwise false
  };
  