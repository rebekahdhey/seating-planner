import { guests, tables } from "../data";
import type { Seating } from "../types";
import { createEmptySeating, guestIdsAtTable } from "./seating";

export type HistoryState = {
  past: Seating[];
  present: Seating;
  future: Seating[];
};

export type Action =
  | { type: "seat"; guestId: number; tableId: number }
  | { type: "unseat"; guestId: number }
  | { type: "reset" }
  | { type: "undo" }
  | { type: "redo" };

export const initialState: HistoryState = {
  past: [],
  present: createEmptySeating(guests),
  future: [],
};

// Save the current plan into history, then use the new one
function commit(state: HistoryState, next: Seating): HistoryState {
  return {
    past: [...state.past, state.present],
    present: next,
    future: [],
  };
}

export function plannerReducer(
  state: HistoryState,
  action: Action
): HistoryState {
  switch (action.type) {
    case "seat": {
      const { guestId, tableId } = action;
      if (state.present[guestId] === tableId) return state;

      const table = tables.find((t) => t.id === tableId);
      if (!table) return state;

      const taken = guestIdsAtTable(state.present, tableId).length;
      if (taken >= table.capacity) return state;

      return commit(state, { ...state.present, [guestId]: tableId });
    }

    case "unseat": {
      if (state.present[action.guestId] === null) return state;
      return commit(state, { ...state.present, [action.guestId]: null });
    }

    case "reset": {
      const nobodySeated = Object.values(state.present).every((t) => t === null);
      if (nobodySeated) return state;
      return commit(state, createEmptySeating(guests));
    }

    case "undo": {
      if (state.past.length === 0) return state;
      const previous = state.past[state.past.length - 1];
      return {
        past: state.past.slice(0, -1),
        present: previous,
        future: [state.present, ...state.future],
      };
    }

    case "redo": {
      if (state.future.length === 0) return state;
      const [next, ...rest] = state.future;
      return {
        past: [...state.past, state.present],
        present: next,
        future: rest,
      };
    }
  }
}