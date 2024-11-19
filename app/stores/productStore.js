import { create } from "zustand";
import axios from "axios";

export const productStore = create((set) => ({
    loadProduct: false,
    error: null,
    products: [],
    fetchProducts: async () => {
        try{
            set({loadProduct: true})
            const result = await axios.get(process.env.NEXT_PUBLIC_API_URL+'/master/products');
            let ascending = result.data.slice().sort();
            set({products: ascending, loadProduct: false})
        } catch(e){
            set({error: e.message, loadProduct: false})
        }
    }
}))