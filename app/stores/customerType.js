"use client"
import {create} from 'zustand';

export const useCustomerType = create((set) => ({
    customerType: [],
    loading: false,
    error: null,
    fetchCustomerType: async () => {
        set({ loading: true });
        try {
        const response = await fetch(`https://demprints-backend.vercel.app/api/master/getCustomerType`); 
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        set({ customerType: data, loading: false });
        } catch (error) {
        set({ error: error.message, loading: false });
        }
    },
}));

