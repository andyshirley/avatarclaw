// AvatarClaw - Create Character Page
// Design: Mobile-first dark luxury form page
// Features: Avatar card with gradient + progress indicator, name/gender/persona fields, "进入聊天" CTA

import { useState, useEffect } from "react";
import { useLocation } from "wouter";

type Gender = "male" | "female";

// Gradient presets for the avatar card (cycling through on "auto generate")
const CARD_GRADIENTS = [
  "linear-gradient(135deg, #C84B11 0%, #E8A87C 50%, #2C1810 100%)",
  "linear-gradient(135deg, #1a1a4e 0%, #3b2f8f 40%, #6b4fbb 100%)",
  "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
  "linear-gradient(135deg, #4a0e0e 0%, #8B1A1A 50%, #C0392B 100%)",
  "linear-gradient(135deg, #0d1b2a 0%, #1b4332 50%, #2d6a4f 100%)",
];

export default function CreateCharacter() {
  const [, navigate] = useLocation();
  const [name, setName] = useState("");
  const [gender, setGender] = useState<Gender>("male");
  const [persona, setPersona] = useState("");
  const [gradientIdx, setGradientIdx] = useState(0);
  const [progress, setProgress] = useState(14);
  const [isGenerating, setIsGenerating] = useState(false);

  // Simulate auto-generate cycling
  const handleAutoGenerate = () => {
    setIsGenerating(true);
    setProgress(0);
    const nextIdx = (gradientIdx + 1) % CARD_GRADIENTS.length;
    setGradientIdx(nextIdx);

    // Simulate progress animation
    let p = 0;
    const interval = setInterval(() => {
      p += Math.floor(Math.random() * 8) + 3;
      if (p >= 14) {
        p = 14;
        clearInterval(interval);
        setIsGenerating(false);
      }
      setProgress(p);
    }, 120);
  };

  const handleEnterChat = () => {
    // Navigate to a generic chat or home
    navigate("/");
  };

  return (
    <>
      {/* ===== MOBILE LAYOUT ===== */}
      <div className="md:hidden min-h-screen bg-[#0C0F12] flex flex-col text-white">
        {/* Status bar placeholder */}
        <div className="flex items-center justify-between px-6 pt-4 pb-2 text-white text-sm font-medium shrink-0">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
              <rect x="0" y="4" width="3" height="7" rx="0.5" fill="white" fillOpacity="0.4"/>
              <rect x="4.5" y="2.5" width="3" height="8.5" rx="0.5" fill="white" fillOpacity="0.6"/>
              <rect x="9" y="0.5" width="3" height="10.5" rx="0.5" fill="white"/>
              <rect x="13.5" y="3" width="2" height="5" rx="0.5" fill="white" fillOpacity="0.3"/>
            </svg>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <path d="M8 2.5C10.2 2.5 12.2 3.4 13.6 4.9L15 3.4C13.2 1.5 10.7 0.3 8 0.3C5.3 0.3 2.8 1.5 1 3.4L2.4 4.9C3.8 3.4 5.8 2.5 8 2.5Z" fill="white"/>
              <path d="M8 5.5C9.5 5.5 10.8 6.1 11.8 7.1L13.2 5.6C11.8 4.2 9.9 3.3 8 3.3C6.1 3.3 4.2 4.2 2.8 5.6L4.2 7.1C5.2 6.1 6.5 5.5 8 5.5Z" fill="white"/>
              <circle cx="8" cy="10" r="1.5" fill="white"/>
            </svg>
            <div className="flex items-center gap-0.5">
              <div className="w-6 h-3 rounded-sm border border-white/60 p-px">
                <div className="w-full h-full bg-white rounded-sm" />
              </div>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="relative flex items-center justify-center px-5 py-3 shrink-0">
          <button
            onClick={() => navigate("/")}
            className="absolute left-5 p-1 text-white/70 hover:text-white transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M13 4L7 10L13 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className="text-base font-medium text-white">创建角色</h1>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 pb-6">
          {/* Avatar card area */}
          <div className="flex justify-center mt-4 mb-8 relative" style={{ height: "260px" }}>
            {/* Main card */}
            <div
              className="relative rounded-2xl overflow-hidden flex flex-col items-center justify-end pb-5"
              style={{
                width: "180px",
                height: "240px",
                background: CARD_GRADIENTS[gradientIdx],
                transition: "background 0.5s ease",
                zIndex: 1,
              }}
            >
              {/* Gender icon badge */}
              <div
                className="absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
              >
                <span className="text-base">{gender === "male" ? "♂" : "♀"}</span>
              </div>

              {/* Card text */}
              <div className="text-center">
                <div className="text-white/70 text-xs mb-0.5">寻找</div>
                <div className="text-white text-sm font-medium">奶油小生</div>
              </div>
            </div>

            {/* Progress overlay card */}
            <div
              className="absolute rounded-2xl flex flex-col items-center justify-center"
              style={{
                width: "110px",
                height: "90px",
                bottom: "0px",
                left: "calc(50% + 10px)",
                background: "rgba(30,30,40,0.75)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.12)",
                zIndex: 2,
              }}
            >
              <div className="text-white/55 text-[11px] mb-1">生成中</div>
              <div className="text-white text-2xl font-bold">{progress}%</div>
            </div>
          </div>

          {/* Form section */}
          <div className="space-y-5">
            {/* Section header */}
            <div className="flex items-center justify-between">
              <span className="text-white/80 text-sm font-medium">角色信息</span>
              <button
                onClick={handleAutoGenerate}
                disabled={isGenerating}
                className="flex items-center gap-1.5 text-white/50 text-xs hover:text-white/80 transition-colors disabled:opacity-40"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7C2 4.24 4.24 2 7 2C8.5 2 9.85 2.65 10.8 3.7L12 2.5V6H8.5L9.85 4.65C9.2 3.95 8.15 3.5 7 3.5C5.07 3.5 3.5 5.07 3.5 7H2ZM11.5 7C11.5 8.93 9.93 10.5 8 10.5C6.85 10.5 5.8 9.95 5.15 9.1L6.5 8H3V11.5L4.2 10.3C5.15 11.35 6.5 12 8 12C10.76 12 13 9.76 13 7H11.5Z" fill="currentColor"/>
                </svg>
                <span>自动生成</span>
              </button>
            </div>

            {/* Name field */}
            <div>
              <label className="block text-white/70 text-sm mb-2">名称</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="给TA起个名字"
                className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              />
            </div>

            {/* Gender field */}
            <div>
              <label className="block text-white/70 text-sm mb-2">性别</label>
              <div className="flex gap-3">
                <button
                  onClick={() => setGender("male")}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all"
                  style={{
                    background: gender === "male" ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)",
                    border: gender === "male" ? "1px solid rgba(255,255,255,0.25)" : "1px solid rgba(255,255,255,0.08)",
                    color: gender === "male" ? "white" : "rgba(255,255,255,0.5)",
                  }}
                >
                  <span>♂</span>
                  <span>男</span>
                </button>
                <button
                  onClick={() => setGender("female")}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all"
                  style={{
                    background: gender === "female" ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)",
                    border: gender === "female" ? "1px solid rgba(255,255,255,0.25)" : "1px solid rgba(255,255,255,0.08)",
                    color: gender === "female" ? "white" : "rgba(255,255,255,0.5)",
                  }}
                >
                  <span>♀</span>
                  <span>女</span>
                </button>
              </div>
            </div>

            {/* Persona field */}
            <div>
              <label className="block text-white/70 text-sm mb-2">人设</label>
              <textarea
                value={persona}
                onChange={(e) => setPersona(e.target.value)}
                placeholder="角色背景、身份、人设、与你的关系等"
                rows={4}
                className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors resize-none"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="px-5 pb-8 pt-3 shrink-0">
          <button
            onClick={handleEnterChat}
            className="w-full py-4 rounded-2xl text-[#0C0F12] text-base font-semibold bg-white hover:bg-white/90 active:bg-white/80 transition-colors"
          >
            进入聊天
          </button>
        </div>
      </div>

      {/* ===== DESKTOP LAYOUT ===== */}
      <div className="hidden md:flex min-h-screen bg-[#0C0F12] items-center justify-center">
        {/* Centered mobile-width card */}
        <div
          className="relative flex flex-col bg-[#0C0F12] rounded-3xl overflow-hidden"
          style={{ width: "390px", minHeight: "844px", boxShadow: "0 40px 120px rgba(0,0,0,0.8)" }}
        >
          {/* Status bar */}
          <div className="flex items-center justify-between px-6 pt-4 pb-2 text-white text-sm font-medium shrink-0">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
                <rect x="0" y="4" width="3" height="7" rx="0.5" fill="white" fillOpacity="0.4"/>
                <rect x="4.5" y="2.5" width="3" height="8.5" rx="0.5" fill="white" fillOpacity="0.6"/>
                <rect x="9" y="0.5" width="3" height="10.5" rx="0.5" fill="white"/>
              </svg>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                <path d="M8 2.5C10.2 2.5 12.2 3.4 13.6 4.9L15 3.4C13.2 1.5 10.7 0.3 8 0.3C5.3 0.3 2.8 1.5 1 3.4L2.4 4.9C3.8 3.4 5.8 2.5 8 2.5Z" fill="white"/>
                <path d="M8 5.5C9.5 5.5 10.8 6.1 11.8 7.1L13.2 5.6C11.8 4.2 9.9 3.3 8 3.3C6.1 3.3 4.2 4.2 2.8 5.6L4.2 7.1C5.2 6.1 6.5 5.5 8 5.5Z" fill="white"/>
                <circle cx="8" cy="10" r="1.5" fill="white"/>
              </svg>
              <div className="w-6 h-3 rounded-sm border border-white/60 p-px">
                <div className="w-full h-full bg-white rounded-sm" />
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="relative flex items-center justify-center px-5 py-3 shrink-0">
            <button
              onClick={() => navigate("/")}
              className="absolute left-5 p-1 text-white/70 hover:text-white transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M13 4L7 10L13 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <h1 className="text-base font-medium text-white">创建角色</h1>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-5 pb-6">
            {/* Avatar card */}
            <div className="flex justify-center mt-4 mb-8 relative" style={{ height: "260px" }}>
              <div
                className="relative rounded-2xl overflow-hidden flex flex-col items-center justify-end pb-5"
                style={{
                  width: "180px",
                  height: "240px",
                  background: CARD_GRADIENTS[gradientIdx],
                  transition: "background 0.5s ease",
                  zIndex: 1,
                }}
              >
                <div
                  className="absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
                >
                  <span className="text-base">{gender === "male" ? "♂" : "♀"}</span>
                </div>
                <div className="text-center">
                  <div className="text-white/70 text-xs mb-0.5">寻找</div>
                  <div className="text-white text-sm font-medium">奶油小生</div>
                </div>
              </div>

              <div
                className="absolute rounded-2xl flex flex-col items-center justify-center"
                style={{
                  width: "110px",
                  height: "90px",
                  bottom: "0px",
                  left: "calc(50% + 10px)",
                  background: "rgba(30,30,40,0.75)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  zIndex: 2,
                }}
              >
                <div className="text-white/55 text-[11px] mb-1">生成中</div>
                <div className="text-white text-2xl font-bold">{progress}%</div>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-white/80 text-sm font-medium">角色信息</span>
                <button
                  onClick={handleAutoGenerate}
                  disabled={isGenerating}
                  className="flex items-center gap-1.5 text-white/50 text-xs hover:text-white/80 transition-colors disabled:opacity-40"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7C2 4.24 4.24 2 7 2C8.5 2 9.85 2.65 10.8 3.7L12 2.5V6H8.5L9.85 4.65C9.2 3.95 8.15 3.5 7 3.5C5.07 3.5 3.5 5.07 3.5 7H2ZM11.5 7C11.5 8.93 9.93 10.5 8 10.5C6.85 10.5 5.8 9.95 5.15 9.1L6.5 8H3V11.5L4.2 10.3C5.15 11.35 6.5 12 8 12C10.76 12 13 9.76 13 7H11.5Z" fill="currentColor"/>
                  </svg>
                  <span>自动生成</span>
                </button>
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">名称</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="给TA起个名字"
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none transition-colors"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">性别</label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setGender("male")}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all"
                    style={{
                      background: gender === "male" ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)",
                      border: gender === "male" ? "1px solid rgba(255,255,255,0.25)" : "1px solid rgba(255,255,255,0.08)",
                      color: gender === "male" ? "white" : "rgba(255,255,255,0.5)",
                    }}
                  >
                    <span>♂</span><span>男</span>
                  </button>
                  <button
                    onClick={() => setGender("female")}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all"
                    style={{
                      background: gender === "female" ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)",
                      border: gender === "female" ? "1px solid rgba(255,255,255,0.25)" : "1px solid rgba(255,255,255,0.08)",
                      color: gender === "female" ? "white" : "rgba(255,255,255,0.5)",
                    }}
                  >
                    <span>♀</span><span>女</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">人设</label>
                <textarea
                  value={persona}
                  onChange={(e) => setPersona(e.target.value)}
                  placeholder="角色背景、身份、人设、与你的关系等"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none transition-colors resize-none"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="px-5 pb-10 pt-3 shrink-0">
            <button
              onClick={handleEnterChat}
              className="w-full py-4 rounded-2xl text-[#0C0F12] text-base font-semibold bg-white hover:bg-white/90 transition-colors"
            >
              进入聊天
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
