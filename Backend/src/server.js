import express from "express";
import cors from "cors";
import { faker } from "@faker-js/faker";
import { generateDataset } from "./generate.js";

const app = express();
app.use(cors());

function randomAccount() {
  return {
    id: faker.string.uuid(),
    name: faker.finance.accountName(),
    bank: faker.company.name(),
    balance: Number(faker.finance.amount({ min: -2000, max: 25000, dec: 2 })),
    accountNumber: `****${faker.finance.accountNumber(4)}`,
    type: faker.helpers.arrayElement(["Checking", "Savings", "Credit"]),
  };
}

function buildCategorySummary(transactions) {
  const colorMap = {
    "Food & Dining": "#5B7553",
    Shopping: "#8EA08A",
    "Bills & Utilities": "#A8C5A0",
    Transportation: "#C4D9BE",
    Entertainment: "#D9E8D5",
    Health: "#E8F3E5",
    Income: "#b6cfc0",
  };
  const totals = new Map();
  for (const tx of transactions) {
    totals.set(tx.category, (totals.get(tx.category) || 0) + tx.amount);
  }
  return Array.from(totals.entries()).map(([name, value]) => ({
    name,
    value: Number(value.toFixed(2)),
    color: colorMap[name] || "#A8C5A0",
  }));
}

function buildMonthlySpending() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const startIndex = new Date().getMonth() - 5;
  return Array.from({ length: 6 }, (_, i) => {
    const idx = (startIndex + i + 12) % 12;
    return { month: months[idx], amount: faker.number.int({ min: 1200, max: 4500 }) };
  });
}

function buildDashboardPayload(count = 30) {
  const { transactions, total } = generateDataset(count);
  const accounts = Array.from({ length: 3 }, randomAccount);
  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const categoryData = buildCategorySummary(transactions);
  const monthlySpending = buildMonthlySpending();
  const recentTransactions = transactions.slice(0, 12);

  return {
    totalBalance: Number(totalBalance.toFixed(2)),
    accounts,
    categoryData,
    monthlySpending,
    recentTransactions,
    transactions,
  };
}

app.get("/api/dashboard", (req, res) => {
  const count = Number(req.query.count) || 30;
  const payload = buildDashboardPayload(count);
  res.json(payload);
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`✅ Backend faker API listening on http://localhost:${port}`);
});
