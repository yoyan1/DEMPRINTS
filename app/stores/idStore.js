import { create } from "zustand";
import axios from "axios";

export const useIdStore = create((set) => ({
    fetchTransactionId: async () =>{
        const responseID = await axios.get(process.env.NEXT_PUBLIC_API_URL+'/collection/getId')
        return responseID
    },
    updateTransactionId: async (data) => {
        const updateId = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/collection/updateID', data)
        return updateId
    }
}))