import { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAsk = async () => {
    if (!question) return;
    try {
      const res = await axios.post("http://localhost:8000/api/chatbot/ask", { question });
      setAnswer(res.data.answer);
    } catch (err) {
      setAnswer("Error: Could not get answer.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">Chatbot</h2>
      <input
        type="text"
        placeholder="Ask a question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <button
        onClick={handleAsk}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Ask
      </button>
      {answer && (
        <div className="mt-4 p-2 bg-gray-100 rounded">
          <strong>Answer:</strong>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
