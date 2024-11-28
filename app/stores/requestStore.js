import { create } from "zustand";
import axios from "axios";

export const useRequestStore = create((set) => ({
    loading: false,
    requestData: [],
    error: null,
    fetchRequest: async () => {
        set({loading: true})
        const response = await axios.get("http://localhost:5000/api/users/requests");
        set({loading: false, error: response.data.msg, requestData: response.data.requests})
    }
}))