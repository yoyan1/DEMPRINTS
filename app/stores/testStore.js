'use client';

import { create } from 'zustand';
import axios from 'axios';

export const useTestStore = create((set) => ({
  columns: [
    { name: "ID", dataKey: "id", sortable: true },
    { name: "DATE", dataKey: "date", sortable: true },
    { name: "TIME", dataKey: "time", sortable: true },
    { name: "TRANSACTION NO.", dataKey: "transaction_no", sortable: true },
    { name: "ITEM NO", dataKey: "item_no" },
    { name: "ITEM NAME", dataKey: "item_name" },
    { name: "UNIT COST", dataKey: "unit_cost", sortable: true },
    { name: "QUANTITY", dataKey: "quantity", sortable: true },
    { name: "AMOUNT", dataKey: "amount", sortable: true },
    { name: "DISCOUNT", dataKey: "discount", sortable: true },
    { name: "TOTAL", dataKey: "total", sortable: true },
    { name: "CUSTOMER TYPE", dataKey: "customer_type", sortable: true },
    { name: "CUSTOMER NAME", dataKey: "customer_name", sortable: true },
    { name: "PAYMENT METHOD", dataKey: "payment_type", sortable: true },
    { name: "SALES PERSON", dataKey: "sales_person", sortable: true },
    { name: "REMARKS", dataKey: "remarks", sortable: true },
  ],
  transactions: [], // Adding a state to hold transaction data

  fetchTransaction: async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/collection/getTransaction');
      set({ transactions: response.data });
    } catch (error) {
      console.log('Error fetching transactions:', error);
    }
  },
}));
