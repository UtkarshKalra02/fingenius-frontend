import axios from "axios";

export const fetchSummary = async () => {
  if (typeof window === "undefined") return {}; // prevent SSR crash

  const token = localStorage.getItem("id_token");

  if (!token) {
    throw new Error("Not authenticated. Please log in again.");
  }

  const response = await axios.get("https://finance-api-teo9.onrender.com/summary", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const sendChatMessage = async (question: string): Promise<string> => {
  try {
    const response = await axios.post("https://finance-api-teo9.onrender.com/chat", { question });
    return response.data.answer || "No response received.";
  } catch (err) {
    console.error("Chat API error:", err);
    return "Something went wrong while contacting the AI.";
  }
};