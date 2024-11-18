import { create } from "zustand";
import axios from "axios";

export const paymentStore = create((set) => ({
    loading: false,
    error: null,
    options: [],
    type: [],
    fetchPayment: async () => {
        try{
            set({loading: true})
            const responseOptions = await axios.get('https://demprints-backend.vercel.app/api/master/getPaymentOptions')
            const responseType = await axios.get('https://demprints-backend.vercel.app/api/master/getPaymentType')
            set({options: responseOptions.data, type: responseType.data, loading: false})
        } catch(e){
            set({error: e.message})
        }
    }
}))