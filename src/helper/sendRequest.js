export const sendRequest = async ({
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

  try {
    const res = await fetch(url, requestOptions);

    if (!res.ok) {
      throw new Error("Network res was not ok");
    }

    const responseData = await res.json();

    return responseData;
  } catch (error) {
    throw new Error("Request failed!");
  }
};
