import { useState } from "react";

const useRequest = () => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async ({
    url,
    method = "GET",
    body = null,
    headers = {},
  }) => {
    const requestOptions = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : null,
    };

    setIsLoading(true);
    try {
      const res = await fetch(url, requestOptions);

      if (!res.ok) {
        throw new Error("Network res was not ok");
      }

      const responseData = await res.json();
      setResponse(responseData);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  return { fetchData, response, isLoading, error };
};

export default useRequest;
