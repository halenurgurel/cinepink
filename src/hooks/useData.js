import { useState, useEffect } from "react";

//fetchFn -> which service function to fetch
//params -> parameters to be passed to the function
const useMovies = (fetchFn, ...params) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const paramsKey = JSON.stringify(params);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setData([]);
      try {
        const result = await fetchFn(...params);
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [fetchFn, paramsKey]); // eslint-disable-line react-hooks/exhaustive-deps
  return { data, loading, error };
};
export default useMovies;
