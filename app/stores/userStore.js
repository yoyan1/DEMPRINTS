"use client"
import {create} from 'zustand';

export const useUserStore = create((set) => ({
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
      {name: "Paused", uid: "paused"},
      {name: "Vacation", uid: "vacation"},
    ],
    users: [],
    loading: false,
    error: null,
    fetchUsers: async () => {
        set({ loading: true });
        try {
        const response = await fetch('http://localhost:5000/api/users/getUsers'); 
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        set({ users: data, loading: false });
        } catch (error) {
        set({ error: error.message, loading: false });
        }
    },
}));

