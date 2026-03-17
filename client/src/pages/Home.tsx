// AvatarClaw - Home Page (Character Selection)
// Desktop: Left brand panel (prismatic glow) + Right 3×2 character grid
// Mobile: Prismatic banner header + AvatarClaw title + "创建角色" btn + user icon + 2-col card grid

import { useLocation } from "wouter";
import { characters } from "@/lib/characters";
import Toolbar from "@/components/Toolbar";

export default function Home() {
  const [, navigate] = useLocation();

  // Prismatic light beam background (shared)
  const PrismaticBg = ({ className = "" }: { className?: string }) => (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Main rainbow conic beam */}
      <div
        className="absolute"
        style={{
          left: "-20%",
          top: "-10%",
          width: "90%",
          height: "120%",
          background: `conic-gradient(
            from 200deg at 38% 52%,
            rgba(255,0,100,0) 0deg,
            rgba(255,80,0,0.75) 8deg,
            rgba(255,200,0,0.7) 18deg,
            rgba(0,255,100,0.65) 28deg,
            rgba(0,180,255,0.7) 38deg,
            rgba(100,0,255,0.75) 48deg,
            rgba(255,0,180,0.75) 58deg,
            rgba(255,0,100,0) 68deg
          )`,
          filter: "blur(6px)",
          opacity: 0.6,
          transform: "scaleX(0.55) rotate(-8deg)",
          transformOrigin: "38% 52%",
        }}
      />
      {/* Purple glow */}
      <div
        className="absolute"
        style={{
          left: "0%",
          top: "50%",
          width: "65%",
          height: "45%",
          background: "radial-gradient(ellipse at 30% 60%, rgba(80,0,200,0.65) 0%, rgba(40,0,120,0.3) 40%, transparent 70%)",
          filter: "blur(55px)",
          opacity: 0.75,
        }}
      />
      {/* Red/pink glow */}
      <div
        className="absolute"
        style={{
          left: "5%",
          top: "15%",
          width: "60%",
          height: "40%",
          background: "radial-gradient(ellipse at 40% 40%, rgba(200,0,80,0.55) 0%, transparent 70%)",
          filter: "blur(50px)",
          opacity: 0.65,
        }}
      />
    </div>
  );

  return (
    <>
      {/* ===== DESKTOP LAYOUT ===== */}
      <div className="hidden md:flex h-screen bg-[#0C0F12] flex-col overflow-hidden">
        <Toolbar url="AvatarClaw.com" />

        <div className="flex flex-row flex-1 overflow-hidden">
          {/* LEFT: Brand panel with prismatic effect */}
          <div
            className="relative flex-shrink-0 flex flex-col justify-center overflow-hidden"
            style={{ width: "36%" }}
          >
            <PrismaticBg />
            <div className="relative z-10 px-14">
              <h1
                className="text-white font-bold leading-none mb-4"
                style={{
                  fontSize: "clamp(3rem, 4vw, 5rem)",
                  letterSpacing: "-0.02em",
                  fontFamily: "'SF Pro Display', 'PingFang SC', system-ui, sans-serif",
                }}
              >
                AvatarClaw
              </h1>
              <p className="text-white/50 text-sm leading-relaxed mb-10 max-w-[240px]">
                你的AI伙伴，帮你查文档、写代码、冲咖啡
              </p>
              <button
                onClick={() => navigate("/create")}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/35 text-white/70 text-sm font-medium hover:border-white/60 hover:text-white transition-all duration-200"
              >
                <span className="text-base leading-none">+</span>
                <span>创建角色</span>
              </button>
            </div>
          </div>

          {/* RIGHT: 3×2 character grid */}
          <div className="flex-1 overflow-y-auto py-6 pr-6 pl-4">
            <div className="grid grid-cols-3 gap-4 h-full" style={{ gridTemplateRows: "repeat(2, 1fr)" }}>
              {characters.map((char, idx) => (
                <div
                  key={char.id}
                  className="relative rounded-2xl overflow-hidden cursor-pointer group"
                  style={{
                    border: idx === 0 ? "2px solid rgba(255,255,255,0.7)" : "2px solid transparent",
                  }}
                  onClick={() => navigate(`/chat/${char.id}`)}
                >
                  <img
                    src={char.image}
                    alt={char.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)",
                    }}
                  />
                  {/* Online dot */}
                  {char.online && (
                    <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-green-400 z-10" />
                  )}
                  {/* Card info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                    <div className="text-white/60 text-[11px] font-medium mb-0.5">{char.role}</div>
                    <div className="text-white text-sm font-semibold mb-1.5">{char.name}</div>
                    <div className="text-white/55 text-[11px] leading-snug line-clamp-2">{char.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===== MOBILE LAYOUT ===== */}
      <div className="md:hidden min-h-screen bg-[#0C0F12] flex flex-col">
        {/* Mobile status bar */}
        <div className="flex items-center justify-between px-6 pt-3 pb-0">
          <span className="text-white text-sm font-semibold">9:41</span>
          <div className="flex items-center gap-1.5">
            {/* Signal bars */}
            <svg width="17" height="12" viewBox="0 0 17 12" fill="white">
              <rect x="0" y="6" width="3" height="6" rx="0.5" opacity="0.4"/>
              <rect x="4.5" y="4" width="3" height="8" rx="0.5" opacity="0.6"/>
              <rect x="9" y="2" width="3" height="10" rx="0.5" opacity="0.8"/>
              <rect x="13.5" y="0" width="3" height="12" rx="0.5"/>
            </svg>
            {/* WiFi */}
            <svg width="16" height="12" viewBox="0 0 16 12" fill="white">
              <path d="M8 9.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"/>
              <path d="M3.5 6.5C4.9 5.1 6.4 4.3 8 4.3s3.1.8 4.5 2.2" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              <path d="M1 4C3 2 5.4 1 8 1s5 1 7 3" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6"/>
            </svg>
            {/* Battery */}
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
              <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="white" strokeOpacity="0.35"/>
              <rect x="2" y="2" width="17" height="8" rx="2" fill="white"/>
              <path d="M23 4v4a2 2 0 000-4z" fill="white" opacity="0.4"/>
            </svg>
          </div>
        </div>

        {/* Prismatic banner */}
        <div className="relative mx-0 mb-0 overflow-hidden" style={{ height: "180px" }}>
          <PrismaticBg />
          {/* Dark overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Header row: AvatarClaw + 创建角色 + user icon */}
        <div className="flex items-center justify-between px-5 py-4">
          <h1
            className="text-white font-bold"
            style={{
              fontSize: "1.6rem",
              letterSpacing: "-0.01em",
              fontFamily: "'SF Pro Display', 'PingFang SC', system-ui, sans-serif",
            }}
          >
            AvatarClaw
          </h1>
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => navigate("/create")}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/30 text-white/80 text-sm font-medium"
            >
              <span className="text-base leading-none">+</span>
              <span>创建角色</span>
            </button>
            {/* User icon */}
            <button className="w-9 h-9 rounded-full border border-white/25 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="6.5" r="3.5" stroke="white" strokeOpacity="0.7" strokeWidth="1.5"/>
                <path d="M2 16c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke="white" strokeOpacity="0.7" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Character grid - 2 columns */}
        <div className="px-4 pb-8 grid grid-cols-2 gap-3">
          {characters.map((char) => (
            <div
              key={char.id}
              className="relative rounded-2xl overflow-hidden cursor-pointer"
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
                  background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)",
                }}
              />
              {char.online && (
                <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-green-400 z-10" />
              )}
              <div className="absolute bottom-0 left-0 right-0 p-3.5 z-10">
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
