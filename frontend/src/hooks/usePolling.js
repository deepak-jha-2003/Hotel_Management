import { useEffect } from "react";
import { useDispatch } from "react-redux";

const usePolling = (action, interval = 5000, dependencies = []) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // 1. Fetch immediately on mount (or when dependencies change)
    dispatch(action());

    // 2. Set up interval to fetch periodically
    const intervalId = setInterval(() => {
      dispatch(action());
    }, interval);

    // 3. Cleanup on unmount to prevent memory leaks
    return () => clearInterval(intervalId);
  }, [dispatch, action, ...dependencies]);
};


export default usePolling;