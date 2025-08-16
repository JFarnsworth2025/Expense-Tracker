import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Mock in-memory data
let expenses = [
  {
    id: 1,
    description: "Groceries",
    amount: 50,
    category: "Food",
    merchant: "Walmart",
    date: "2023-01-01",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    description: "Utilities",
    amount: 100,
    category: "Bills",
    merchant: "Electric Company",
    date: "2023-01-05",
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

let expenseId = expenses.length + 1;

// Routes
app.get('/', (req, res) => {
  res.send('Expense Tracker API is running...');
});

app.get("/api/expenses", (req, res) => {
  res.json(expenses);
});

app.get('/expenses', (req, res) => {
  res.json(expenses);
});

app.post("/api/expenses", (req, res) => {
  const newExpense = {
    id: expenseId++,
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  expenses.push(newExpense);
  res.status(201).json(newExpense);
});

app.put("/api/expenses/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = expenses.findIndex((expense) => expense.id === id);
  if (index === -1) return res.status(404).json({ error: "Expense not found" });

  expenses[index] = {
    ...expenses[index],
    ...req.body,
    updatedAt: new Date(),
  };
  res.json(expenses[index]);
});

app.delete("/api/expenses/:id", (req, res) => {
  const id = parseInt(req.params.id);
  expenses = expenses.filter((expense) => expense.id !== id);
  res.status(204).send();
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Mock API running at http://localhost:${PORT}`);
});

// Previous Prisma-based implementation (commented out)
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { PrismaClient } from "@prisma/client";

// dotenv.config();
// const app = express();
// const prisma = new PrismaClient();

// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Expense Tracker API is running...");
// });

// app.get("/expenses", async (req, res) => {
//   const expenses = await prisma.expense.findMany();
//   res.json(expenses);
// });

// app.post("/expenses", async (req, res) => {
//   const { title, amount, category } = req.body;
//   const newExpense = await prisma.expense.create({
//     data: {
//       title,
//       amount,
//       category,
//     },
//   });
//   res.status(newExpense);
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
