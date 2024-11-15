"use client"
import {create} from 'zustand';
import axios from 'axios';

export const useUserStore = create((set) => ({
    user: null,
    isAuthenticate: false,
    loading: false,
    error: null,
    create: async (data) =>{
      set({ loading: true });
      const response = await axios.post('https://demprints-backend.vercel.app/api/users/register', data);
      set({ loading: false });
      return response
    },
    login: async (data) =>{
      set({ loading: true });
      const response = await axios.post('https://demprints-backend.vercel.app/api/users/login', data);
      set({ loading: false });
      return response
    },
    getAuthenticateUser: async () =>{
      if (typeof window !== "undefined"){
         set({ loading: true });
          const token = localStorage.getItem("token")
          if(token){
            const response = await axios.get('https://demprints-backend.vercel.app/api/users/user', {
              headers: {
                'Authorization': `Bearer ${token}`,
              }
            });
            set({user: response.data ,loading: false, isAuthenticate: true });
          } else{
            set({loading: false, isAuthenticate: false})
          }
       }
    },
    deleteUser: async (id) =>{
      set({ loading: true });
      const response = await axios.delete(`https://demprints-backend.vercel.app/api/users/delete/${id}`)
      set({ loading: false });
      return response
    },
    columns: [
      {name: "ID", uid: "id", sortable: true},
      {name: "NAME", uid: "name", sortable: true},
      {name: "AGE", uid: "age", sortable: true},
      {name: "ROLE", uid: "job_title", sortable: true},
      {name: "DEPARTMENT", uid: "department"},
      {name: "EMAIL", uid: "email"},
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
        const response = await fetch(`https://demprints-backend.vercel.app/api/users`); 
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        set({ users: data, loading: false });
        } catch (error) {
        set({ error: error.message, loading: false });
        }
    },
}));

