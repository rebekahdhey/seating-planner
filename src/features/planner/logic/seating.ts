import type { Guest, Seating } from "../types";

export function createEmptySeating(guests: Guest[]): Seating {
  const seating: Seating = {};
  for (const guest of guests) {
    seating[guest.id] = null;
  }
  return seating;
}

export function guestIdsAtTable(seating: Seating, tableId: number): number[] {
  return Object.entries(seating)
    .filter(([, seatedAt]) => seatedAt === tableId)
    .map(([guestId]) => Number(guestId));
}

// A feud counts if EITHER guest lists the other
export function areFeuding(a: Guest, b: Guest): boolean {
  return a.feuds.includes(b.id) || b.feuds.includes(a.id);
}

export function findConflicts(guestsAtTable: Guest[]): [Guest, Guest][] {
  const pairs: [Guest, Guest][] = [];

  for (let i = 0; i < guestsAtTable.length; i++) {
    for (let j = i + 1; j < guestsAtTable.length; j++) {
      if (areFeuding(guestsAtTable[i], guestsAtTable[j])) {
        pairs.push([guestsAtTable[i], guestsAtTable[j]]);
      }
    }
  }

  return pairs;
}