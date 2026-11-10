import { useEffect, useReducer, useState } from "react";
import Panel from "./components/Panel";
import GuestCard from "./features/planner/components/GuestCard";
import TableCard from "./features/planner/components/TableCard";
import Toolbar from "./features/planner/components/Toolbar";
import { guests, tables } from "./features/planner/data";
import { findConflicts } from "./features/planner/logic/seating";
import {
  initialState,
  plannerReducer,
} from "./features/planner/logic/reducer";

function App() {
  const [state, dispatch] = useReducer(plannerReducer, initialState);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const seating = state.present;

  // Undo / redo with Cmd/Ctrl + Z and Shift
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (!(e.metaKey || e.ctrlKey) || e.key.toLowerCase() !== "z") return;
      e.preventDefault();
      dispatch({ type: e.shiftKey ? "redo" : "undo" });
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Derived data: nothing below is stored in state
  const waiting = guests.filter((g) => seating[g.id] === null);
  const seatedCount = guests.length - waiting.length;

  const tableViews = tables.map((table) => {
    const seated = guests.filter((g) => seating[g.id] === table.id);
    return { table, seated, conflicts: findConflicts(seated) };
  });

  const totalConflicts = tableViews.reduce(
    (sum, view) => sum + view.conflicts.length,
    0
  );

  const selectedGuest = guests.find((g) => g.id === selectedId);

  function toggleSelect(id: number) {
    setSelectedId((current) => (current === id ? null : id));
  }

  function seatGuest(guestId: number, tableId: number) {
    dispatch({ type: "seat", guestId, tableId });
    setSelectedId(null);
  }

  function unseatGuest(guestId: number) {
    dispatch({ type: "unseat", guestId });
    setSelectedId(null);
  }

  return (
    <div className="mx-auto max-w-6xl space-y-5 p-4 sm:p-6">
      <header className="text-center">
        <h1 className="text-4xl font-bold sm:text-5xl">✦ The Grand Ball ✦</h1>
        <p className="mt-1 text-ink/70">
          {seatedCount} of {guests.length} guests seated
        </p>
      </header>

      <Toolbar
        canUndo={state.past.length > 0}
        canRedo={state.future.length > 0}
        onUndo={() => dispatch({ type: "undo" })}
        onRedo={() => dispatch({ type: "redo" })}
        onReset={() => {
          dispatch({ type: "reset" });
          setSelectedId(null);
        }}
      />

      <p role="status" className="text-center font-medium">
        {totalConflicts === 0
          ? "✨ All tables are peaceful."
          : `⚠️ ${totalConflicts} ${
              totalConflicts === 1 ? "conflict" : "conflicts"
            } to resolve.`}
      </p>

      {selectedGuest && (
        <div className="flex flex-wrap items-center justify-center gap-3 rounded-2xl bg-gold/15 px-4 py-3">
          <span>
            {selectedGuest.emoji} <strong>{selectedGuest.name}</strong> is
            selected. Choose a table, or:
          </span>
          <button
            type="button"
            onClick={() => unseatGuest(selectedGuest.id)}
            className="min-h-11 rounded-full border border-gold/50 bg-white px-4 text-sm font-medium"
          >
            Send back to the waiting list
          </button>
        </div>
      )}

      <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const id = Number(e.dataTransfer.getData("text/plain"));
            if (!Number.isNaN(id)) unseatGuest(id);
          }}
        >
          <Panel title="Waiting list" tone="blush" className="h-full">
            {waiting.length === 0 ? (
              <p className="text-ink/70">Everyone is seated 🎉</p>
            ) : (
              <div className="space-y-2">
                {waiting.map((guest) => (
                  <GuestCard
                    key={guest.id}
                    guest={guest}
                    selected={guest.id === selectedId}
                    onClick={() => toggleSelect(guest.id)}
                  />
                ))}
              </div>
            )}
          </Panel>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {tableViews.map(({ table, seated, conflicts }) => (
            <TableCard
              key={table.id}
              table={table}
              seated={seated}
              conflicts={conflicts}
              selectedGuestId={selectedId}
              onSeatHere={() => {
                if (selectedId !== null) seatGuest(selectedId, table.id);
              }}
              onSelectGuest={toggleSelect}
              onDropGuest={(guestId) => seatGuest(guestId, table.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;