// AvatarClaw - Chat Page
// Design: Split layout - character portrait left (40%), chat right (60%)
// Dark luxury aesthetic - fixed viewport height, no page scroll

import { useState, useRef, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { characters } from "@/lib/characters";
import Toolbar from "@/components/Toolbar";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function Chat() {
  const params = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const character = characters.find((c) => c.id === params.id) || characters[0];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: character.greeting,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const responses = [
        "我理解你的感受，慢慢来，不用着急。",
        "这个问题很有趣，让我想想...",
        "你说得对，我也有同样的想法。",
        "嗯，我在听，继续说吧。",
        "谢谢你愿意和我分享这些。",
        "我觉得你做得很好，不要太苛责自己。",
        "有时候，放慢脚步也是一种智慧。",
      ];
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000 + Math.random() * 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* ===== DESKTOP LAYOUT ===== */}
      <div className="hidden md:flex h-screen bg-[#0C0F12] flex-col overflow-hidden">
        <Toolbar url="AvatarClaw.com" />

        <div className="flex flex-row flex-1 overflow-hidden">
          {/* LEFT: Character portrait */}
          <div className="relative w-[40%] flex-shrink-0 overflow-hidden">
            {/* Back button */}
            <button
              onClick={() => navigate("/")}
              className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white/70 hover:text-white text-sm transition-colors border border-white/10"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>首页</span>
            </button>

            {/* Online status */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-xs font-medium">服务中</span>
            </div>

            {/* Character image */}
            <img
              src={character.image}
              alt={character.name}
              className="w-full h-full object-cover object-top"
            />

            {/* Right edge gradient */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(to right, transparent 60%, rgba(12,15,18,0.8) 100%)",
              }}
            />
            {/* Bottom gradient */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(to top, rgba(12,15,18,0.4) 0%, transparent 30%)",
              }}
            />
          </div>

          {/* RIGHT: Chat panel */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Character info header */}
            <div className="px-6 pt-5 pb-4 border-b border-white/5 shrink-0">
              <div className="text-white text-xl font-semibold">你好，我是{character.name}</div>
              <div className="text-white/45 text-sm mt-0.5">{character.role}</div>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 mr-2.5 mt-0.5">
                      <img src={character.image} alt={character.name} className="w-full h-full object-cover object-top" />
                    </div>
                  )}
                  <div
                    className={`max-w-[72%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-white/12 text-white rounded-tr-sm"
                        : "bg-[#1C1C1E] text-white/90 rounded-tl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 mr-2.5 mt-0.5">
                    <img src={character.image} alt={character.name} className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="bg-[#1C1C1E] px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="px-6 pb-6 pt-3 shrink-0">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`和${character.name}聊聊心里话...`}
                  className="w-full px-4 py-3 pr-12 rounded-2xl bg-white/8 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-white/25 focus:bg-white/10 transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="absolute right-3 w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 12V2M2 7l5-5 5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== MOBILE LAYOUT ===== */}
      <div className="md:hidden h-screen bg-[#0C0F12] flex flex-col overflow-hidden">
        {/* Mobile header */}
        <div className="flex items-center gap-3 px-4 pt-12 pb-3 border-b border-white/8 shrink-0">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors text-sm"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img src={character.image} alt={character.name} className="w-full h-full object-cover object-top" />
          </div>
          <div className="flex-1">
            <div className="text-white text-sm font-medium">{character.name}</div>
            <div className="text-white/45 text-xs">{character.role}</div>
          </div>
          <div className="flex items-center gap-1.5 text-green-400 text-xs">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span>服务中</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 mr-2 mt-0.5">
                  <img src={character.image} alt={character.name} className="w-full h-full object-cover object-top" />
                </div>
              )}
              <div
                className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-white/12 text-white rounded-tr-sm"
                    : "bg-[#1C1C1E] text-white/90 rounded-tl-sm"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 mr-2 mt-0.5">
                <img src={character.image} alt={character.name} className="w-full h-full object-cover object-top" />
              </div>
              <div className="bg-[#1C1C1E] px-3.5 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-4 pb-8 pt-3 shrink-0">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`和${character.name}聊聊心里话...`}
              className="w-full px-4 py-3 pr-12 rounded-2xl bg-white/8 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-white/25 transition-all"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="absolute right-3 w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 12V2M2 7l5-5 5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
