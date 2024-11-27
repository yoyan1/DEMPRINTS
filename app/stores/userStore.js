"use client"
import {create} from 'zustand';
import axios from 'axios';

export const useUserStore = create((set) => ({
    user: null,
    isAuthenticate: true,
    loading: false,
    error: null,
    findIfExist: async (data) =>{
      set({ loading: true });
      const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/users/findIDNumber', data);
      set({ loading: false });
      return response
    },
    create: async (data) =>{
      set({ loading: true });
      const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/users/register', data);
      set({ loading: false });
      return response
    },
    update: async (id, data) =>{
      set({ loading: true });
      const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/users/update/'+id, data);
      set({ loading: false });
      return response
    },
    login: async (data) =>{
      set({ loading: true });
      const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/users/login', data);
      set({ loading: false });
      return response
    },
    getAuthenticateUser: async (id) =>{
      try{
        // if (typeof window !== "undefined"){
           set({ loading: true });
        //     const token = localStorage.getItem("token")
        //     if(token){
        //       const response = await axios.get(process.env.NEXT_PUBLIC_API_URL+'/users/user', {
        //         headers: {
        //           'Authorization': `Bearer ${token}`,
        //         }
        //       });
  
        //       set({error: response.data.message, user: response.data.user ,loading: false, isAuthenticate: response.data.err });
        //     } else{
          //       set({loading: false, isAuthenticate: false})
          //     }
          //  }
          const response = await axios.get(process.env.NEXT_PUBLIC_API_URL+'/users/getUser/'+id)
          set({user: response.data ,loading: false, isAuthenticate: true });

      } catch(e) {
        set({error: e, isAuthenticate: false})
      }
    },
    deleteUser: async (id) =>{
      set({ loading: true });
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/users/delete/${id}`)
      set({ loading: false });
      return response
    },
    columns: [
      {name: "ID", uid: "id", sortable: true},
      {name: "NAME", uid: "name", sortable: true},
      {name: "AGE", uid: "age", sortable: true},
      {name: "ROLE", uid: "job_title", sortable: true},
      {name: "DEPARTMENT", uid: "department"},
      {name: "ID NUMBER", uid: "id_number"},
      {name: "STATUS", uid: "status", sortable: true},
      {name: "ACTIONS", uid: "actions"}, 
    ],

    statusOptions: [
      {name: "Active", uid: "active"},
      {name: "Inactive", uid: "inactive"},
    ],
    users: [],
    fetchUsers: async () => {
        set({ loading: true });
        try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`); 
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        set({ users: data, loading: false });
        } catch (error) {
        set({ error: error.message, loading: false });
        }
    },
}));

