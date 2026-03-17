// AvatarClaw - Chat Page
// Desktop: Left character full-height portrait + Right chat panel
//   - Top: 40px padding, "← 首页" left, character name+avatar right
//   - Messages: 60px left/right padding, bubbles max-width with 60px margin
//   - Bottom: 40px padding, quick action tags + input box
// Mobile: Full-screen character image background, messages overlay, bottom input bar
//   - Header: back arrow + avatar+name center + volume icon
//   - Input: image icon + text input + mic icon

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

const quickActions = [
  { icon: "📅", label: "日程管理" },
  { icon: "🖥", label: "整理桌面" },
  { icon: "🌤", label: "天气预报" },
];

function formatTime(date: Date) {
  const h = date.getHours();
  const m = date.getMinutes().toString().padStart(2, "0");
  const period = h >= 12 ? "下午" : "上午";
  const hour = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${period} ${hour}:${m}`;
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
        "可以的，不过我需要先知道你说的具体指哪一种呀 🤔",
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
          {/* LEFT: Character portrait - full height */}
          <div className="relative flex-shrink-0 overflow-hidden" style={{ width: "42%" }}>
            <img
              src={character.image}
              alt={character.name}
              className="w-full h-full object-cover object-top"
            />
            {/* Right edge fade into chat panel */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(to right, transparent 55%, rgba(12,15,18,0.85) 100%)",
              }}
            />
            {/* Bottom fade */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(to top, rgba(12,15,18,0.5) 0%, transparent 25%)",
              }}
            />
            {/* Volume icon bottom-left */}
            <button className="absolute bottom-10 left-6 z-10 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/15 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 5.5H1v5h2l4 3V2.5L3 5.5z" fill="white" opacity="0.7"/>
                <path d="M11 4.5c1.5 1 2.5 2.5 2.5 3.5s-1 2.5-2.5 3.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" opacity="0.7"/>
                <path d="M13 2.5c2 1.5 3.5 3.5 3.5 5.5s-1.5 4-3.5 5.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" opacity="0.4"/>
              </svg>
            </button>
          </div>

          {/* RIGHT: Chat panel — paddings: top 40px, left/right 60px, bottom 40px */}
          <div className="flex-1 flex flex-col overflow-hidden bg-[#0C0F12]">
            {/* Top bar: 40px top padding */}
            <div
              className="flex items-center justify-between shrink-0"
              style={{ paddingTop: "40px", paddingLeft: "60px", paddingRight: "60px", paddingBottom: "16px" }}
            >
              {/* Back to home */}
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors text-sm"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>首页</span>
              </button>
              {/* Character name + avatar */}
              <div className="flex items-center gap-2.5">
                <span className="text-white/80 text-sm font-medium">{character.name}</span>
                <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20">
                  <img src={character.image} alt={character.name} className="w-full h-full object-cover object-top" />
                </div>
              </div>
            </div>

            {/* Messages area — 60px left/right padding */}
            <div
              className="flex-1 overflow-y-auto space-y-3"
              style={{ paddingLeft: "60px", paddingRight: "60px", paddingTop: "8px", paddingBottom: "8px" }}
            >
              {messages.map((msg, idx) => {
                // Show timestamp before first message or when time gap > 5 min
                const showTime =
                  idx === 0 ||
                  (messages[idx - 1] &&
                    msg.timestamp.getTime() - messages[idx - 1].timestamp.getTime() > 5 * 60 * 1000);

                return (
                  <div key={msg.id}>
                    {showTime && (
                      <div className="text-center text-white/30 text-xs py-2">
                        {formatTime(msg.timestamp)}
                      </div>
                    )}
                    <div className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                          msg.role === "user"
                            ? "text-white rounded-tr-sm"
                            : "text-white/90 rounded-tl-sm"
                        }`}
                        style={{
                          maxWidth: "calc(100% - 60px)",
                          background: msg.role === "user"
                            ? "rgba(255,255,255,0.1)"
                            : "rgba(40,40,45,0.9)",
                          border: msg.role === "user"
                            ? "1px solid rgba(255,255,255,0.12)"
                            : "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        {msg.content}
                      </div>
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex justify-start">
                  <div
                    className="px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1"
                    style={{ background: "rgba(40,40,45,0.9)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick action tags + input — bottom 40px padding */}
            <div
              className="shrink-0"
              style={{ paddingLeft: "60px", paddingRight: "60px", paddingBottom: "40px", paddingTop: "12px" }}
            >
              {/* Quick action tags */}
              <div className="flex items-center gap-2 mb-3">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-white/55 hover:text-white/80 transition-colors"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <span>{action.icon}</span>
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>
              {/* Input box */}
              <div
                className="relative flex items-center rounded-2xl"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`让${character.name}帮你做...`}
                  className="flex-1 px-4 py-3.5 bg-transparent text-white text-sm placeholder:text-white/30 focus:outline-none"
                />
                {/* Image attach icon */}
                <button className="mr-2 w-8 h-8 flex items-center justify-center text-white/35 hover:text-white/60 transition-colors">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <rect x="1.5" y="3.5" width="15" height="11" rx="2" stroke="currentColor" strokeWidth="1.3"/>
                    <circle cx="6" cy="7.5" r="1.5" stroke="currentColor" strokeWidth="1.3"/>
                    <path d="M1.5 12l4-4 3 3 2.5-2.5 5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {/* Send button */}
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="mr-2 w-8 h-8 rounded-full flex items-center justify-center transition-all disabled:opacity-30"
                  style={{ background: input.trim() ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.15)" }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 12V2M2 7l5-5 5 5" stroke={input.trim() ? "#0C0F12" : "white"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== MOBILE LAYOUT ===== */}
      {/* Full-screen character image as background */}
      <div className="md:hidden h-screen flex flex-col overflow-hidden relative">
        {/* Background character image */}
        <img
          src={character.image}
          alt={character.name}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        {/* Dark overlay for readability */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.7) 100%)",
          }}
        />

        {/* Content layer */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Status bar */}
          <div className="flex items-center justify-between px-6 pt-3 pb-0">
            <span className="text-white text-sm font-semibold">9:41</span>
            <div className="flex items-center gap-1.5">
              <svg width="17" height="12" viewBox="0 0 17 12" fill="white">
                <rect x="0" y="6" width="3" height="6" rx="0.5" opacity="0.4"/>
                <rect x="4.5" y="4" width="3" height="8" rx="0.5" opacity="0.6"/>
                <rect x="9" y="2" width="3" height="10" rx="0.5" opacity="0.8"/>
                <rect x="13.5" y="0" width="3" height="12" rx="0.5"/>
              </svg>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="white">
                <path d="M8 9.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"/>
                <path d="M3.5 6.5C4.9 5.1 6.4 4.3 8 4.3s3.1.8 4.5 2.2" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                <path d="M1 4C3 2 5.4 1 8 1s5 1 7 3" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6"/>
              </svg>
              <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
                <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="white" strokeOpacity="0.35"/>
                <rect x="2" y="2" width="17" height="8" rx="2" fill="white"/>
                <path d="M23 4v4a2 2 0 000-4z" fill="white" opacity="0.4"/>
              </svg>
            </div>
          </div>

          {/* Nav bar: back + avatar+name center + volume */}
          <div className="flex items-center justify-between px-5 pt-2 pb-3">
            <button
              onClick={() => navigate("/")}
              className="w-9 h-9 flex items-center justify-center"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M13 4L7 10L13 16" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Center: avatar + name */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white/40">
                <img src={character.image} alt={character.name} className="w-full h-full object-cover object-top" />
              </div>
              <span className="text-white font-semibold text-base">{character.name}</span>
            </div>

            {/* Volume icon */}
            <button className="w-9 h-9 flex items-center justify-center">
              <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
                <path d="M4 6H2v6h2l5 4V2L4 6z" fill="white" opacity="0.8"/>
                <path d="M14 3c2 1.5 3.5 3.5 3.5 6s-1.5 4.5-3.5 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
                <path d="M17 1c2.5 2 4 5 4 8s-1.5 6-4 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
              </svg>
            </button>
          </div>

          {/* Spacer — character image shows through */}
          <div className="flex-1 overflow-y-auto px-5 py-2 space-y-3 flex flex-col justify-end">
            {messages.map((msg, idx) => {
              const showTime =
                idx === 0 ||
                (messages[idx - 1] &&
                  msg.timestamp.getTime() - messages[idx - 1].timestamp.getTime() > 5 * 60 * 1000);
              return (
                <div key={msg.id}>
                  {showTime && (
                    <div className="text-center text-white/50 text-xs py-1.5">
                      {formatTime(msg.timestamp)}
                    </div>
                  )}
                  <div className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed max-w-[80%] ${
                        msg.role === "user"
                          ? "text-white rounded-tr-sm"
                          : "text-white rounded-tl-sm"
                      }`}
                      style={{
                        background: msg.role === "user"
                          ? "rgba(255,255,255,0.15)"
                          : "rgba(50,50,55,0.85)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      {msg.content}
                    </div>
                  </div>
                </div>
              );
            })}
            {isTyping && (
              <div className="flex justify-start">
                <div
                  className="px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1"
                  style={{ background: "rgba(50,50,55,0.85)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Bottom input bar */}
          <div className="px-4 pb-8 pt-3 shrink-0">
            <div
              className="flex items-center gap-2 px-4 py-3 rounded-full"
              style={{
                background: "rgba(30,30,35,0.85)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              {/* Image icon */}
              <button className="w-7 h-7 flex items-center justify-center text-white/50 shrink-0">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="2" y="4" width="16" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.4"/>
                  <circle cx="7" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M2 14l5-5 3.5 3.5 2.5-2.5 5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {/* Input */}
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="畅所欲聊"
                className="flex-1 bg-transparent text-white text-sm placeholder:text-white/35 focus:outline-none"
              />
              {/* Mic icon */}
              <button className="w-7 h-7 flex items-center justify-center text-white/50 shrink-0">
                <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
                  <rect x="5.5" y="1" width="7" height="11" rx="3.5" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M1 10c0 4.4 3.6 8 8 8s8-3.6 8-8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  <path d="M9 18v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </button>
              {/* Send button (shown when input has text) */}
              {input.trim() && (
                <button
                  onClick={handleSend}
                  disabled={isTyping}
                  className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 12V2M2 7l5-5 5 5" stroke="#0C0F12" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
