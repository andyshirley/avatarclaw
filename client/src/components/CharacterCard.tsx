// AvatarClaw - Character Card Component
// Dark luxury aesthetic with hover effects

import { Character } from "@/lib/characters";
import { useLocation } from "wouter";

interface CharacterCardProps {
  character: Character;
  selected?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function CharacterCard({ character, selected = false, size = "md" }: CharacterCardProps) {
  const [, navigate] = useLocation();

  const handleClick = () => {
    navigate(`/chat/${character.id}`);
  };

  return (
    <div
      className={`character-card card-hover group ${selected ? "selected-card" : ""} ${
        size === "sm" ? "h-[180px]" : size === "lg" ? "h-[360px]" : "h-[260px]"
      }`}
      onClick={handleClick}
    >
      <img
        src={character.image}
        alt={character.name}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent rounded-[12px] pointer-events-none" />

      {/* Online indicator */}
      {character.online && (
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 z-10">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        </div>
      )}

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
        <div className="text-white/60 text-[11px] font-medium mb-0.5 leading-none">{character.role}</div>
        <div className="text-white text-[15px] font-semibold leading-tight mb-1">{character.name}</div>
        <p className="text-white/55 text-[11px] leading-snug line-clamp-2">{character.description}</p>
      </div>
    </div>
  );
}
