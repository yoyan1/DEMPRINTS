import React, { useEffect } from "react";
import {Listbox, ListboxItem, Avatar, Button, Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell, User} from "@nextui-org/react";
import { useUserStore } from '@/app/stores/userStore'

export default function SalesRepresentative() {
  const { users, loading, fetchUsers } = useUserStore()

  useEffect(()=>{
    fetchUsers()
  }, [fetchUsers])


  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>ROLE</TableColumn>
        <TableColumn key="name" allowsSorting>SALES</TableColumn>
      </TableHeader>    
      <TableBody>
        {users.map((user, index) => (
          <TableRow key="1">
              <TableCell>
                <User
                  avatarProps={{radius: "lg", src: user.imageUrl}}
                  description={user.id_number}
                  name={user.name}
                >
                  {user.id_number}
                </User>
              </TableCell>
              <TableCell>{user.job_title}</TableCell>
              <TableCell>{100 * index}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
