import { faker } from "@faker-js/faker";

export function randomTransaction() {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    amount: Number(faker.finance.amount({ min: -500, max: 500, dec: 2 })),
    date: faker.date.recent({ days: 45 }).toISOString().slice(0, 10),
    category: faker.helpers.arrayElement([
      "Food & Dining",
      "Shopping",
      "Bills & Utilities",
      "Transportation",
      "Health",
      "Entertainment",
      "Income",
    ]),
  };
}

export function generateDataset(count = 25) {
  const transactions = Array.from({ length: count }, randomTransaction);
  const total = transactions.reduce((s, t) => s + t.amount, 0);
  return { total, transactions };
}

// If run directly: print JSON payload
if (process.argv[1] && process.argv[1].includes("generate.js")) {
  const n = Number(process.argv[2]) || 25;
  const dataset = generateDataset(n);
  console.log(JSON.stringify(dataset, null, 2));
}
