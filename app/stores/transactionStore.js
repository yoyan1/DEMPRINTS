"use client"
import {create} from 'zustand';
import axios from 'axios';

export const useSalesStore = create((set) => ({
    createTransaction: async (data) => {
        const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/collection/addTransaction', data)
        return response.data
    },
    updateTransaction: async (id, data) => {
        const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/collection/updateTransaction/'+id, data)
        return response.data
    },
    deleteTransaction: async(id) => {
        const response = await axios.delete(process.env.NEXT_PUBLIC_API_URL+'/collection/deletetransaction/'+id)
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
        {name: "SUB TOTAL", dataKey: "sub_total", sortable: true},
        {name: "DISCOUNT", dataKey: "discount", sortable: true},
        {name: "TOTAL AMOUNT", dataKey: "total_amount", sortable: true},
        {name: "AMOUNT PAID", dataKey: "amount_paid", sortable: true},
        {name: "CUSTOMER TYPE", dataKey: "customer_type", sortable: true},
        {name: "CUSTOMER NAME", dataKey: "customer_name", sortable: true},
        {name: "PAYMENT OPTIONS", dataKey: "payment_options", sortable: true},
        {name: "SALES PERSON", dataKey: "sales_person", sortable: true},
        {name: "BALANCE", dataKey: "balance", sortable: true},
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
        // let descending = data.sort((a, b) => b.transaction_no - a.transaction_no);
        set({ transactions: data, loading: false });
        } catch (error) {
        set({ error: error.message, loading: false });
        }
    },
}));

