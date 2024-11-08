"use client"
import {create} from 'zustand';

export const useExpensesCategory = create((set) => ({
    categoryList: [],
    loading: false,
    error: null,
    fetchExpensesCategory: async () => {
        set({ loading: true });
        try {
        const response = await fetch('https://demprints-backend.vercel.app/api/master/getExpensesCategory'); 
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        set({ categoryList: data, loading: false });
        } catch (error) {
        set({ error: error.message, loading: false });
        }
    },
}));

