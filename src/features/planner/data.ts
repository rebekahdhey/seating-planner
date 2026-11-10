import type { Guest, Table } from "./types";

export const guests: Guest[] = [
  { id: 1, name: "Lady Rosalind", emoji: "🌹", feuds: [4] },
  { id: 2, name: "Lord Edmund", emoji: "🎩", feuds: [] },
  { id: 3, name: "Miss Clementine", emoji: "🦢", feuds: [6] },
  { id: 4, name: "Duchess Beatrix", emoji: "👑", feuds: [1] },
  { id: 5, name: "Captain Alistair", emoji: "⚓", feuds: [8] },
  { id: 6, name: "Lady Philippa", emoji: "🪭", feuds: [3] },
  { id: 7, name: "Mr. Percival", emoji: "📜", feuds: [] },
  { id: 8, name: "Countess Odette", emoji: "💎", feuds: [5] },
  { id: 9, name: "Viscount Thaddeus", emoji: "🎻", feuds: [] },
  { id: 10, name: "Miss Winifred", emoji: "🌸", feuds: [4] },
];

export const tables: Table[] = [
  { id: 1, name: "The Rose Table", capacity: 4 },
  { id: 2, name: "The Pearl Table", capacity: 4 },
  { id: 3, name: "The Garden Table", capacity: 4 },
];