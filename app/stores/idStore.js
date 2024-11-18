import { create } from "zustand";
import axios from "axios";

export const useIdStore = create((set) => ({
    fetchTransactionId: async () =>{
        const responseID = await axios.get('https://demprints-backend.vercel.app/api/collection/getId')
        return responseID
    },
    updateTransactionId: async (data) => {
        const updateId = await axios.post('https://demprints-backend.vercel.app/api/collection/updateID', data)
        return updateId
    }
}))