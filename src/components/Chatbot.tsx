"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  id: string;
  sender: "user" | "bot";
  text: string;
};

const QNA_DB: Record<string, string> = {
  "how to vote?": "To vote, you need to be registered. On election day, go to your designated polling booth, show your Voter ID, sign the register, and press the button next to your chosen candidate.",
  "what is nota?": "NOTA stands for 'None of the Above'. It allows you to express that you don't support any of the listed candidates.",
  "who can vote?": "Generally, any citizen who is 18 years of age or older and registered on the electoral roll can vote.",
  "how to register?": "You can usually register online through your national or local election authority portal. Check our 'Learn' section for more!",
  "what is evm?": "EVM stands for Electronic Voting Machine. It's a secure device used to record votes electronically."
};

const SUGGESTIONS = ["How to vote?", "What is NOTA?", "Who can vote?", "How to register?"];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", sender: "bot", text: "Hi! I'm your VoteWise assistant. How can I help you understand the election process today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const idRef = useRef<number>(2);

  const genId = () => (idRef.current++).toString();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: genId(), sender: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let botResponse = "I'm not sure about that specific detail. Try asking about voting, NOTA, or registration! You can also check our Learning Guide.";
      
      for (const [key, val] of Object.entries(QNA_DB)) {
        if (lowerText.includes(key.replace("?", ""))) {
          botResponse = val;
          break;
        }
      }

      setMessages((prev) => [...prev, { id: genId(), sender: "bot", text: botResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            className="fixed bottom-20 md:bottom-24 right-4 md:right-8 w-[90vw] max-w-[400px] h-[500px] max-h-[65vh] glass-card rounded-[24px] overflow-hidden flex flex-col z-[100] shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-white/10"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-container to-primary px-6 py-4 flex justify-between items-center shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-body-md leading-none">VoteWise Assistant</h3>
                  <span className="text-[10px] text-white/80 uppercase tracking-widest font-bold">Online</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-white transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide bg-surface/20">
              {messages.map((msg) => (
                <motion.div 
                  initial={{ opacity: 0, x: msg.sender === "user" ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={msg.id} 
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-[18px] text-body-md shadow-sm ${
                      msg.sender === "user"
                        ? "bg-primary-container text-on-primary-container rounded-tr-none"
                        : "bg-surface-container-high text-on-surface border border-outline-variant/30 rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-surface-container-high px-4 py-3 rounded-[18px] rounded-tl-none border border-outline-variant/30 flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-primary-container rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-primary-container rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-primary-container rounded-full animate-bounce"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions & Input */}
            <div className="p-4 bg-surface-container-low/40 backdrop-blur-md border-t border-white/5">
              <div className="flex gap-2 overflow-x-auto pb-3 no-scrollbar snap-x">
                {SUGGESTIONS.map((sug) => (
                  <button
                    key={sug}
                    onClick={() => handleSend(sug)}
                    className="shrink-0 text-label-sm px-4 py-2 rounded-full border border-primary-container/30 bg-primary-container/5 text-primary-container hover:bg-primary-container/20 transition-all snap-start whitespace-nowrap"
                  >
                    {sug}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-surface-container-highest/50 border border-outline-variant/30 rounded-full px-5 py-3 text-body-md text-on-surface focus:outline-none focus:border-primary-container transition-colors"
                />
                <button
                  onClick={() => handleSend(input)}
                  disabled={!input.trim()}
                  className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale"
                >
                  <span className="material-symbols-outlined">send</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 md:bottom-8 right-4 md:right-8 z-[110] w-14 h-14 rounded-full bg-gradient-to-br from-primary-container to-primary flex items-center justify-center text-white shadow-[0_8px_32px_rgba(255,153,51,0.5)] border border-white/20 transition-all ${isOpen ? 'translate-y-[-4px]' : ''}`}
      >
        <span className="material-symbols-outlined text-[30px]" style={{ fontVariationSettings: `'FILL' ${isOpen ? 0 : 1}` }}>
          {isOpen ? "close" : "forum"}
        </span>
      </motion.button>
    </>
  );
}
