import { ChatGPTRequestBody } from "../data/types";

export const generateCards = async (reqBody: ChatGPTRequestBody) => {
  const response = await fetch(`${import.meta.env.BACKEND}/api/create`, {
    method: "POST",
    body: JSON.stringify(reqBody),
    headers: { "Content-Type": "application/json" },
    mode: "cors",
  });
  return response.json();
};
