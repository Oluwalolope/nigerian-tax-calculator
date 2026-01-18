import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AppContext from "../store/AppContext";

type Role = "user" | "assistant";

interface Message {
  role: Role;
  content: string;
}

interface AssistantResponse {
  AIResponse: string;
}

const apiUrl = import.meta.env.VITE_API_URL;

const suggestedQuestions = [
  "How is the Consolidated Relief Allowance calculated?",
  "What are the 2026 tax brackets?",
  "How can I reduce my tax liability?",
];

const AiAssistant = () => {
  const appCtx = useContext(AppContext);
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm your 2026 tax reform assistant.\n\nI can explain your tax results, deductions, reliefs, and payment steps. What would you like to know?",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/chat/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          userID: appCtx.userID,
          prompt: text,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch assistant reply");
      }

      const data: AssistantResponse = await response.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.AIResponse },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I couldn’t fetch a response right now. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-slate-50">
      {/* HEADER */}
      <header className="py-6 flex items-center gap-15 sm:gap-30 lg:gap-45 px-4 border-b border-neutral max-w-3xl mx-auto w-full mb-5">
        <button
          onClick={() => navigate("/")}
          className="text-start inline-flex items-center gap-2 text-primary/70 hover:text-primary transition-colors duration-150 ease-in-out font-medium cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-primary/95">Tax Assistance</h1>
      </header>

      {/* CHAT */}
      <div className="flex-1 overflow-y-auto px-4 pb-40">
        <div className="mx-auto max-w-3xl space-y-6">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] whitespace-pre-line rounded-3xl px-6 py-4 ${
                  msg.role === "assistant"
                    ? "bg-primary/95 text-white rounded-tl-none"
                    : "bg-neutral text-slate-800 rounded-br-none"
                }`}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}

          {/* TYPING INDICATOR */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="rounded-3xl rounded-tl-none bg-blue-100 px-6 py-3 text-sm text-primary/95">
                Assistant is typing…
              </div>
            </motion.div>
          )}
        </div>

        {/* SUGGESTED QUESTIONS */}
        <div className="mx-auto mt-10 max-w-3xl">
          <p className="mb-3 text-sm font-medium text-slate-600">
            Suggested questions:
          </p>

          <div className="flex flex-wrap gap-3">
            {suggestedQuestions.map((question) => (
              <button
                key={question}
                onClick={() => sendMessage(question)}
                disabled={loading || appCtx.userID === ''}
                className="rounded-full bg-neutral/70 px-4 py-2 text-start text-sm text-slate-700 transition hover:bg-neutral disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* INPUT */}
      <footer className="fixed bottom-0 left-0 right-0 border-t border-neutral bg-slate-50">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-4">
          <input
            value={input}
            disabled={loading || appCtx.userID === ''}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder={appCtx.userID === '' ? 'Please use the tax calculator to ask tax assistance' : 'Ask Tax Assistance'}
            className="flex-1 rounded-full bg-blue-100/70 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </footer>
    </main>
  );
};

export default AiAssistant;
