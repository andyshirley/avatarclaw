// AvatarClaw - Safari-style Browser Toolbar
// Dark theme, macOS browser chrome aesthetic

interface ToolbarProps {
  url?: string;
}

export default function Toolbar({ url = "AvatarClaw.com" }: ToolbarProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 bg-[#1C1C1E] border-b border-white/8 select-none">
      {/* Traffic lights */}
      <div className="flex items-center gap-1.5 shrink-0">
        <div className="w-3 h-3 rounded-full bg-[#EE6A5F] hover:bg-[#EE6A5F]/80 transition-colors" />
        <div className="w-3 h-3 rounded-full bg-[#F5BD4F] hover:bg-[#F5BD4F]/80 transition-colors" />
        <div className="w-3 h-3 rounded-full bg-[#61C454] hover:bg-[#61C454]/80 transition-colors" />
      </div>

      {/* Navigation arrows */}
      <div className="flex items-center gap-1 shrink-0">
        <button className="p-1 text-white/30 hover:text-white/60 transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button className="p-1 text-white/20 hover:text-white/40 transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Address bar */}
      <div className="flex-1 flex items-center justify-center">
        <div className="flex items-center gap-1.5 px-3 py-1 bg-white/8 rounded-md min-w-[200px] max-w-[400px]">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-white/40 shrink-0">
            <path d="M6 1C3.24 1 1 3.24 1 6s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 9c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="currentColor"/>
          </svg>
          <span className="text-white/60 text-xs font-medium">{url}</span>
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 shrink-0">
        <button className="p-1 text-white/30 hover:text-white/60 transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
        <button className="p-1 text-white/30 hover:text-white/60 transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
