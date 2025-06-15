import axios from "axios";

export const fetchSummary = async () => {
  const token = localStorage.getItem("id_token");
  const response = await axios.get("http://127.0.0.1:8000/summary", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const sendChatMessage = async (question: string): Promise<string> => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/chat", { question });
    return response.data.answer || "No response received.";
  } catch (err) {
    console.error("Chat API error:", err);
    return "Something went wrong while contacting the AI.";
  }
};