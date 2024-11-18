import { create } from "zustand";
import axios from "axios";

export const productStore = create((set) => ({
    loadProduct: false,
    error: null,
    products: [],
    fetchProducts: async () => {
        try{
            set({loadProduct: true})
            const result = await axios.get('https://demprints-backend.vercel.app/api/master/products');
            let ascending = result.data.slice().sort();
            set({products: ascending, loadProduct: false})
        } catch(e){
            set({error: e.message, loadProduct: false})
        }
    }
}))