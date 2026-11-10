import type { Guest } from "../types";

type GuestCardProps = {
  guest: Guest;
  selected: boolean;
  conflict?: boolean;
  onClick: () => void;
};

function GuestCard({ guest, selected, conflict = false, onClick }: GuestCardProps) {
  const look = conflict
    ? "border-danger bg-danger/10"
    : "border-gold/30 bg-white hover:bg-blush/50";

  return (
    <button
      type="button"
      draggable
      onDragStart={(e) => e.dataTransfer.setData("text/plain", String(guest.id))}
      onClick={onClick}
      aria-pressed={selected}
      className={`flex min-h-11 w-full cursor-grab items-center gap-2 rounded-xl border px-3 py-2 text-left transition ${look} ${
        selected ? "ring-2 ring-gold" : ""
      }`}
    >
      <span aria-hidden="true" className="text-xl">
        {guest.emoji}
      </span>
      <span className="font-medium">{guest.name}</span>
    </button>
  );
}

export default GuestCard;