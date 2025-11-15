// Navigation utility for use outside React components (e.g., axios interceptors)
let navigateFunction = null;

export const navigation = {
  setNavigate: (navigate) => {
    navigateFunction = navigate;
  },
  navigate: (to, options) => {
    if (navigateFunction) {
      navigateFunction(to, options);
    } else {
      // Fallback to window.location if navigate is not initialized
      window.location.href = to;
    }
  },
};

