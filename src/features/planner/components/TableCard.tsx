import Panel from "../../../components/Panel";
import GuestCard from "./GuestCard";
import type { Guest, Table } from "../types";

type TableCardProps = {
  table: Table;
  seated: Guest[];
  conflicts: [Guest, Guest][];
  selectedGuestId: number | null;
  onSeatHere: () => void;
  onSelectGuest: (id: number) => void;
  onDropGuest: (id: number) => void;
};

function TableCard({
  table,
  seated,
  conflicts,
  selectedGuestId,
  onSeatHere,
  onSelectGuest,
  onDropGuest,
}: TableCardProps) {
  const isFull = seated.length >= table.capacity;
  const selectedIsHere = seated.some((g) => g.id === selectedGuestId);
  const conflictIds = new Set(conflicts.flatMap(([a, b]) => [a.id, b.id]));
  const emptySeats = table.capacity - seated.length;

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const id = Number(e.dataTransfer.getData("text/plain"));
        if (!Number.isNaN(id)) onDropGuest(id);
      }}
    >
      <Panel title={table.name} tone={conflicts.length > 0 ? "blush" : "powder"}>
        <p className="mb-3 text-sm text-ink/70">
          {seated.length} of {table.capacity} seats filled
        </p>

        <div className="space-y-2">
          {seated.map((guest) => (
            <GuestCard
              key={guest.id}
              guest={guest}
              selected={guest.id === selectedGuestId}
              conflict={conflictIds.has(guest.id)}
              onClick={() => onSelectGuest(guest.id)}
            />
          ))}

          {Array.from({ length: emptySeats }, (_, i) => (
            <div
              key={i}
              className="h-11 rounded-xl border border-dashed border-gold/40"
            />
          ))}
        </div>

        {selectedGuestId !== null && !selectedIsHere && (
          <button
            type="button"
            onClick={onSeatHere}
            disabled={isFull}
            className="mt-3 min-h-11 w-full rounded-xl bg-gold px-4 font-semibold text-white transition hover:brightness-110 disabled:opacity-40"
          >
            {isFull ? "Table is full" : "Seat here"}
          </button>
        )}

        {conflicts.map(([a, b]) => (
          <p
            key={`${a.id}-${b.id}`}
            role="alert"
            className="mt-3 rounded-lg bg-danger/10 px-3 py-2 text-sm text-danger"
          >
            ⚠️ {a.name} and {b.name} would rather not share a table.
          </p>
        ))}
      </Panel>
    </div>
  );
}

export default TableCard;