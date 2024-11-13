"use client"
import {create} from 'zustand';
import axios from 'axios';

export const useUserStore = create((set) => ({
    create: async (data) =>{
      const response = await axios.post('https://demprints-backend.vercel.app/api/users/register', data);
      return response
    },
    deleteUser: async (id) =>{
      const response = await axios.delete(`https://demprints-backend.vercel.app/api/users/delete/${id}`)
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
    loading: false,
    error: null,
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

