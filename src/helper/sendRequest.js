import { toast } from "react-toastify";

export const sendRequest = async ({
  url,
  method = "GET",
  body = null,
  headers = {},
  allowNotifications = true,
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

    const responseData = await res.json();

    if (!res.ok || !responseData.success) {
      if (allowNotifications) toast.error(responseData.message);
      throw new Error(responseData.message);
    }

    if (allowNotifications) toast.success(responseData?.message);

    return responseData;
  } catch (error) {
    throw new Error(error.message);
  }
};
