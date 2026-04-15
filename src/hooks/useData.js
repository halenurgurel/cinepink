import { useState, useEffect } from "react";

//fetchFn -> which service function to fetch
//params -> parameters to be passed to the function
const useMovies = (fetchFn, ...params) => {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const paramsKey = JSON.stringify(params);

  useEffect(() => {
    const currentParams = JSON.parse(paramsKey);
    const page = currentParams[currentParams.length - 1];

    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fetchFn(...currentParams);
        if (result?.results) {
          setData((prev) =>
            page === 1 ? result.results : [...prev, ...result.results],
          );
          setTotalPages(result.totalPages);
        } else {
          setData(result);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [fetchFn, paramsKey]);
  return { data, loading, error, totalPages };
};
export default useMovies;
