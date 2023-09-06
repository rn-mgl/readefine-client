import React from "react";

export const useLoading = (initialState) => {
  const [loading, setLoading] = React.useState(initialState);

  const setLoadingState = React.useCallback((state) => {
    setLoading(state);
  }, []);

  return {
    loading,
    setLoadingState,
  };
};
