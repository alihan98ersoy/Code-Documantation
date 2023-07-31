// api.ts

import axios, { AxiosResponse } from "axios";

// Define the form data type
export type FormData = {
  language_id: string;
  source_code: string;
  stdin: string;
};

// Define the response data type
export type ResponseData = {
  token: string;
};

export const encodeBase64 = (data: string) => {
  // Convert the string to UTF-8 using unescape and encodeURIComponent
  const utf8Data = unescape(encodeURIComponent(data));
  return btoa(utf8Data);
};

export const compileCode = (formData: FormData): Promise<ResponseData> => {
  // Create the options object
  const options: any = {
    method: "POST",
    url: process.env.REACT_APP_RAPID_API_URL,
    params: { base64_encoded: "true", fields: "*" },
    headers: {
      "content-type": "application/json",
      "Content-Type": "application/json",
      "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
    },
    data: formData,
  };

  // Send the request and return the promise
  return axios.request(options);
};

export const checkStatus = (token: string): Promise<AxiosResponse> => {
  // Create the options object
  const options: any = {
    method: "GET",
    url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
    params: { base64_encoded: "true", fields: "*" },
    headers: {
      "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
    },
  };

  // Send the request and return the promise
  return axios.request(options);
};
