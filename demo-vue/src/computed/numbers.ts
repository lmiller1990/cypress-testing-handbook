export type Parity = "odd" | "even";

export function getNumbers(parity: Parity): number[] {
  const evens: number[] = [];
  const odds: number[] = [];

  for (let i = 1; i < 10; i++) {
    if (i % 2 === 0) {
      evens.push(i);
    } else {
      odds.push(i);
    }
  }

  return parity === "odd" ? odds : evens;
}
