import { create } from "zustand";
import axios from "axios";

export const useGcashTransactionStore = create((set) => ({
    transaction_gcash: [], 
    loadTransaction: false,
    fetchGcashTransaction: async () =>{
        set({loadTransaction: true})
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL+'/collection/getGcashTransaction')
        set({loadTransaction: false, transaction_gcash: response.data})
    },
    createGcashTransaction: async (data) => {
        set({loadTransaction: true})
        const updateResult = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/collection/createGcashTransaction', data)
        set({loadTransaction: false})
        return updateResult.data
    }
}))