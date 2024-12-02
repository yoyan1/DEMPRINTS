import { create } from "zustand";
import axios from "axios";

export const useBalanceStore = create((set) => ({
    balance: [], 
    loadBalance: false,
    fetchBalance: async () =>{
        set({loadBalance: true})
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL+'/master/getBalance')
        set({loadBalance: false, balance: response.data})
    },
    addBalance: async (data) => {
        set({loadBalance: true})
        const updateResult = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/master/addBalance', data)
        set({loadBalance: false})
        return updateResult.data
    }
}))