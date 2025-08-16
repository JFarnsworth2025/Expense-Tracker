import dotenv from 'dotenv';
dotenv.config();

let expenses = [];
let expenseId = 1;

let prisma = null;
if(process.env.MOCK_MODE !== true) {
    const { PrismaClient } = await import('@prisma/client');
    prisma = new PrismaClient();
}

export const dataSource = {
    async getExpenses() {
        if (process.env.MOCK_MODE === "true") {
            return expenses;
        } else {
            return await prisma.expense.findMany();
        }
    },
    async createExpense(data) {
        if (process.env.MOCK_MODE === "true") {
            const newExpense = { id: expenseId++, ...data };
            expenses.push(newExpense);
            return newExpense;
        } else {
            return await prisma.expense.create({ data });
        }
    },
    async updateExpense(id, data) {
        if (process.env.MOCK_MODE === "true") {
            const index = expenses.findIndex((exp) => exp.id === id);
            if (index !== -1) {
                expenses[index] = { ...expenses[index], ...data };
                return expenses[index];
            }
            throw new Error("Expense not found");
        } else {
            return await prisma.expense.update({
                where: { id },
                data,
            });
        }
    },
    async deleteExpense(id) {
        if (process.env.MOCK_MODE === "true") {
            expenses = expenses.filter((exp) => exp.id !== id);
            return { success: true };
        } else {
            await prisma.expense.delete({ where: { id } });
            return { success: true };
        }
    },
};