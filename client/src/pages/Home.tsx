// AvatarClaw - Home Page
// Design: Dark luxury AI companion platform
// Desktop: Left brand area (42%) + Right: large character card (center) + info panel (right) + thumbnails (bottom)
// Mobile: Stacked layout with scrollable character list

import { useState, useRef } from "react";
import { useLocation } from "wouter";
import Toolbar from "@/components/Toolbar";
import { characters } from "@/lib/characters";

export default function Home() {
  const [, navigate] = useLocation();
  const [activeIdx, setActiveIdx] = useState(0);
  const thumbnailRef = useRef<HTMLDivElement>(null);
  const activeChar = characters[activeIdx];

  return (
    <>
      {/* ===== DESKTOP LAYOUT ===== */}
      <div className="hidden md:flex h-screen bg-[#0C0F12] flex-col overflow-hidden">
        <Toolbar url="AvatarClaw.com" />

        <div className="flex flex-row flex-1 overflow-hidden">
          {/* LEFT: Brand panel */}
          <div
            className="relative flex-shrink-0 flex flex-col justify-center overflow-hidden"
            style={{ width: "38%" }}
          >
            {/* Prismatic light beams - matching Figma's rainbow prism effect */}
            <div
              className="absolute pointer-events-none"
              style={{
                left: "-10%",
                top: "0%",
                width: "100%",
                height: "100%",
                background: `
                  conic-gradient(
                    from 200deg at 35% 55%,
                    rgba(255,0,100,0) 0deg,
                    rgba(255,80,0,0.7) 10deg,
                    rgba(255,200,0,0.65) 20deg,
                    rgba(0,255,100,0.6) 30deg,
                    rgba(0,180,255,0.65) 40deg,
                    rgba(100,0,255,0.7) 50deg,
                    rgba(255,0,180,0.7) 60deg,
                    rgba(255,0,100,0) 70deg
                  )
                `,
                filter: "blur(8px)",
                opacity: 0.55,
                transform: "scaleX(0.6) rotate(-5deg)",
                transformOrigin: "35% 55%",
              }}
            />
            {/* Secondary glow */}
            <div
              className="absolute pointer-events-none"
              style={{
                left: "0%",
                top: "45%",
                width: "60%",
                height: "40%",
                background: "radial-gradient(ellipse at 30% 60%, rgba(80,0,200,0.6) 0%, rgba(40,0,120,0.3) 40%, transparent 70%)",
                filter: "blur(50px)",
                opacity: 0.7,
              }}
            />
            {/* Pink/red glow */}
            <div
              className="absolute pointer-events-none"
              style={{
                left: "5%",
                top: "20%",
                width: "55%",
                height: "35%",
                background: "radial-gradient(ellipse at 40% 40%, rgba(200,0,80,0.5) 0%, transparent 70%)",
                filter: "blur(45px)",
                opacity: 0.6,
              }}
            />

            <div className="relative z-10 px-16">
              <h1
                className="text-white font-bold leading-none mb-4"
                style={{
                  fontSize: "clamp(3.5rem, 4.5vw, 5.5rem)",
                  letterSpacing: "-0.02em",
                  fontFamily: "'SF Pro Display', 'PingFang SC', system-ui, sans-serif",
                }}
              >
                AvatarClaw
              </h1>
              <p className="text-white/50 text-sm leading-relaxed mb-10 max-w-[260px]">
                你的AI伙伴，帮你查文档、写代码、冲咖啡
              </p>
              <button
                onClick={() => navigate(`/chat/${activeChar.id}`)}
                className="px-7 py-2.5 rounded-full border border-white/60 text-white text-sm font-medium hover:bg-white hover:text-black transition-all duration-200 mb-5"
              >
                即刻开聊
              </button>
              <div
                className="flex items-center gap-2 text-white/40 text-sm cursor-pointer hover:text-white/60 transition-colors"
                onClick={() => thumbnailRef.current?.scrollIntoView({ behavior: "smooth" })}
              >
                <span>滑动选择角色</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 2v10M2 7l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* RIGHT: Character showcase */}
          <div className="flex-1 flex flex-col overflow-hidden pt-3 pb-4 pr-6">
            {/* Main area: large card + info panel */}
            <div className="flex flex-row flex-1 gap-5 overflow-hidden min-h-0">
              {/* Large character card */}
              <div
                className="relative rounded-2xl overflow-hidden flex-shrink-0"
                style={{ width: "calc(52% - 10px)", cursor: "pointer" }}
                onClick={() => navigate(`/chat/${activeChar.id}`)}
              >
                <img
                  src={activeChar.image}
                  alt={activeChar.name}
                  className="w-full h-full object-cover object-top"
                  style={{ transition: "transform 0.4s ease" }}
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 40%, transparent 70%)",
                  }}
                />
                {/* Online indicator */}
                {activeChar.online && (
                  <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-green-400 z-10" />
                )}
              </div>

              {/* Character info panel */}
              <div className="flex flex-col justify-end pb-6 flex-1 min-w-0">
                <div className="text-white/55 text-sm mb-1">{activeChar.role}</div>
                <div
                  className="text-white font-bold mb-3"
                  style={{ fontSize: "clamp(1.8rem, 2.5vw, 2.8rem)", letterSpacing: "-0.01em" }}
                >
                  {activeChar.name}
                </div>
                <div className="text-white/55 text-sm leading-relaxed">
                  {activeChar.description}
                </div>
                <button
                  onClick={() => navigate(`/chat/${activeChar.id}`)}
                  className="mt-6 self-start px-5 py-2 rounded-full border border-white/30 text-white/70 text-xs hover:border-white/60 hover:text-white transition-all"
                >
                  开始聊天
                </button>
              </div>
            </div>

            {/* Bottom: thumbnail strip */}
            <div ref={thumbnailRef} className="mt-4 flex-shrink-0">
              <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
                {characters.map((char, idx) => (
                  <div
                    key={char.id}
                    className="relative rounded-xl overflow-hidden flex-shrink-0 cursor-pointer"
                    style={{
                      width: "100px",
                      height: "130px",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                      transform: activeIdx === idx ? "translateY(-3px)" : "none",
                      boxShadow: activeIdx === idx
                        ? "0 0 0 2px rgba(255,255,255,0.8), 0 8px 24px rgba(0,0,0,0.4)"
                        : "none",
                      opacity: activeIdx === idx ? 1 : 0.65,
                    }}
                    onClick={() => setActiveIdx(idx)}
                  >
                    <img
                      src={char.image}
                      alt={char.name}
                      className="w-full h-full object-cover object-top"
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)",
                      }}
                    />
                    {char.online && (
                      <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-green-400 z-10" />
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-2 z-10">
                      <div className="text-white/55 text-[9px]">{char.role}</div>
                      <div className="text-white text-[11px] font-semibold">{char.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== MOBILE LAYOUT ===== */}
      <div className="md:hidden min-h-screen bg-[#0C0F12] flex flex-col">
        {/* Mobile header */}
        <div className="flex items-center justify-between px-5 pt-14 pb-5">
          <div>
            <h1 className="text-white text-2xl font-bold tracking-tight">AvatarClaw</h1>
            <p className="text-white/45 text-xs mt-0.5">你的AI伙伴</p>
          </div>
          <button
            onClick={() => navigate(`/chat/${characters[0].id}`)}
            className="px-4 py-2 rounded-full border border-white/50 text-white text-xs font-medium"
          >
            即刻开聊
          </button>
        </div>

        {/* Hero section with prismatic background */}
        <div className="relative mx-5 mb-6 rounded-2xl overflow-hidden" style={{ height: "200px" }}>
          <div
            className="absolute inset-0"
            style={{
              background: "conic-gradient(from 180deg at 50% 50%, rgba(255,0,128,0.7) 0deg, rgba(255,165,0,0.6) 60deg, rgba(255,255,0,0.55) 100deg, rgba(0,255,128,0.55) 150deg, rgba(0,200,255,0.65) 200deg, rgba(128,0,255,0.7) 260deg, rgba(255,0,200,0.7) 320deg, rgba(255,0,128,0.7) 360deg)",
              filter: "blur(30px)",
              opacity: 0.5,
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-white text-4xl font-bold tracking-tight mb-2">AvatarClaw</div>
              <div className="text-white/60 text-sm">帮你查文档、写代码、冲咖啡</div>
            </div>
          </div>
        </div>

        {/* Section header */}
        <div className="px-5 mb-3 flex items-center justify-between">
          <span className="text-white/70 text-sm font-medium">选择你的AI伙伴</span>
          <span className="text-white/35 text-xs">{characters.length} 位角色</span>
        </div>

        {/* Character grid - 2 columns */}
        <div className="px-5 pb-8 grid grid-cols-2 gap-3">
          {characters.map((char) => (
            <div
              key={char.id}
              className="relative rounded-xl overflow-hidden cursor-pointer"
              style={{ aspectRatio: "3/4" }}
              onClick={() => navigate(`/chat/${char.id}`)}
            >
              <img
                src={char.image}
                alt={char.name}
                className="w-full h-full object-cover object-top"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.2) 45%, transparent 100%)",
                }}
              />
              {char.online && (
                <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-green-400 z-10" />
              )}
              <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
                <div className="text-white/60 text-[10px] font-medium mb-0.5">{char.role}</div>
                <div className="text-white text-sm font-semibold mb-1">{char.name}</div>
                <div className="text-white/55 text-[10px] leading-snug line-clamp-2">{char.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
