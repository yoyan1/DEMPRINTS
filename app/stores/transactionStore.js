"use client"
import {create} from 'zustand';
import axios from 'axios';

export const useSalesStore = create((set) => ({
    createTransaction: async (data) => {
        const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/collection/addTransaction', data)
        return response.data
    },
    columns: [
        {name: "ID", dataKey: "id", sortable: true},
        {name: "TRANSACTION DATE", dataKey: "date", sortable: true},
        {name: "TRS. TIME", dataKey: "time", sortable: true},
        {name: "TRANSACTION NO.", dataKey: "transaction_no", sortable: true},
        {name: "ITEM NO", dataKey: "item_no"},
        {name: "ITEM NAME", dataKey: "item_name"},
        {name: "UNIT COST", dataKey: "unit_cost", sortable: true},
        {name: "QUANTITY", dataKey: "quantity", sortable: true},
        {name: "AMOUNT", dataKey: "amount", sortable: true},
        {name: "DISCOUNT", dataKey: "discount", sortable: true},
        {name: "TOTAL", dataKey: "total", sortable: true},
        {name: "CUSTOMER TYPE", dataKey: "customer_type", sortable: true},
        {name: "CUSTOMER NAME", dataKey: "customer_name", sortable: true},
        {name: "PAYMENT TYPE", dataKey: "payment_type", sortable: true},
        {name: "SALES PERSON", dataKey: "sales_person", sortable: true},
        {name: "REMARKS", dataKey: "remarks", sortable: true},
        {name: "ACTIONS", dataKey: "actions", sortable: true},
    ],
    itemOptions: [
        {name: "Tarpaulin", dataKey: "tarpaulin"},
        {name: "Photocopy", dataKey: "photocopy"},
        {name: "Photo print", dataKey: "photo print"},
        {name: "others", dataKey: "others"},
    ],
    typeOptions: [
        {name: "Walk in", dataKey: "walk in"},
        {name: "Online", dataKey: "online"},
    ],
    transactions: [],
    loading: false,
    error: null,
    fetchTransactions: async () => {
        set({ loading: true });
        try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/collection/getTransaction`); 
        // if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.data;
        let ascending = data.sort((a, b) => a.transaction_no - b.transaction_no);
        set({ transactions: ascending, loading: false });
        } catch (error) {
        set({ error: error.message, loading: false });
        }
    },
}));

