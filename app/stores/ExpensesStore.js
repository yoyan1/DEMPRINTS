"use client"
import {create} from 'zustand';

export const useExpensesStore = create((set) => ({
    categoryList: [],
    expenses: [],
    loading: false,
    error: null,
    fetchExpensesCategory: async () => {
        set({ loading: true });
        try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/master/getExpensesCategory`); 
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        set({ categoryList: data, loading: false });
        } catch (error) {
        set({ error: error.message, loading: false });
        }
    },
    columns: [
        {name: "ID", dataKey: "id", sortable: true},
        {name: "TRANSACTION DATE", dataKey: "date", sortable: true},
        {name: "TRANSACTION NO.", dataKey: "transaction_no", sortable: true},
        {name: "CATEGORY", dataKey: "category"},
        {name: "TYPE", dataKey: "type"},
        {name: "ITEM NAME", dataKey: "item_name"},
        {name: "UNIT COST", dataKey: "unit_cost", sortable: true},
        {name: "QUANTITY", dataKey: "quantity", sortable: true},
        {name: "TOTAL", dataKey: "total", sortable: true},
    ],
    fetchExpenses: async () => {
        set({ loading: true });
        try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collection/expenses`); 
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        // let descending = data.sort((a, b) => b.transaction_no - a.transaction_no);
        set({ expenses: data, loading: false });
        } catch (error) {
        set({ error: error.message, loading: false });
        }
    }
}));

