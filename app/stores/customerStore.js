import { create } from "zustand";
import axios from "axios";

export const useCustomerStore = create((set) => ({
    costumerLoading: false,
    error: null,
    customer_type: [],
    fetchCustomer : async () => {
        const customerType = await axios.get('https://demprints-backend.vercel.app/api/master/getCustomerType')
        set({costumerLoading: false, customer_type: customerType.data})
    }
}))