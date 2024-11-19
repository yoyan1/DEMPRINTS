import { create } from "zustand";
import axios from "axios";

export const useCustomerStore = create((set) => ({
    costumerLoading: false,
    error: null,
    customer_type: [],
    fetchCustomer : async () => {
        const customerType = await axios.get(process.env.NEXT_PUBLIC_API_URL+'/master/getCustomerType')
        set({costumerLoading: false, customer_type: customerType.data})
    }
}))