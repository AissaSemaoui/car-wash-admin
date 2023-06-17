const { useEffect, useState } = require("react");

// Data Fetching Hook
export const useDataFetching = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed loading data`);
      }

      const jsonData = await response.json();

      if (!jsonData.success) {
        throw new Error(`Failed loading data`);
      }

      setData(jsonData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    fetchData();
  };

  return { data, isLoading, error, handleRetry };
};
