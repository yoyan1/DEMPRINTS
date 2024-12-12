import { create } from "zustand";
import axios from "axios";

export const useRequestStore = create((set) => ({
    loading: false,
    requestData: [],
    error: null,
    fetchRequest: async () => {
        set({loading: true})
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL+"/users/requests");
        set({loading: false, error: response.data.msg, requestData: response.data.requests})
    },
    acceptRequest: async (data) => {
        set({loading: true})
        const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+"/users/acceptRequest", data);
        set({false: true})
        return response.data
    },
    declineRequest: async (id) => {
        set({loading: true})
        const response = await axios.delete(process.env.NEXT_PUBLIC_API_URL+"/users/deleteRequests"+id);
        set({false: true})
        return response.data
    },
}))