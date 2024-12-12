import React, { useEffect, useMemo } from "react";
import { Button, Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell, User, Pagination} from "@nextui-org/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card"
import { useUserStore } from '@/app/stores/userStore'
import { useSalesStore } from '@/app/stores/transactionStore'

export default function SalesRepresentative() {
  const {transactions, fetchTransactions } = useSalesStore();
  const { users, loading, fetchUsers } = useUserStore()
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const pages = Math.ceil(users.length / rowsPerPage);
  useEffect(()=>{
    fetchUsers()
    fetchTransactions()
  }, [])

  const dateParser = (dateString) => new Date(dateString);

  const filteredTransactions = useMemo(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); 
    
    const filterByCurrentMonth = transactions.filter(sale => {
        const saleDate = dateParser(sale.date);
        return saleDate.getFullYear() === currentYear && saleDate.getMonth() === currentMonth;
    });

    return filterByCurrentMonth

  }, [transactions])

  const usersSalesData = (users, transactions) => {
    const userData = []

    users.map((user) => {
      const user_id = user.id
      const filterSales = transactions.filter((sale) => sale.employee_id === user_id)
      if(filterSales.length > 0) {
        let totalSales = 0
        filterSales.map((sale) => {
          totalSales = totalSales + sale.amount_paid
        })
        userData.push({...user, totalSales: totalSales})
      } else{
        userData.push({...user, totalSales: 0})
      }
    })
    return userData
  }

  const userData = useMemo(() => {
    const data = usersSalesData(users, filteredTransactions)
    return data.sort((a, b) => b.totalSales - a.totalSales)
  }, [users, filteredTransactions])

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return userData.slice(start, end);
  }, [page, userData, rowsPerPage]);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);


  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Previous
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, users.length, page, pages]);

  return (
    <Card className="dark:bg-gray-900">
      <CardHeader>
        <CardTitle>Employee - Monthly</CardTitle>
        <CardDescription>
          Showing total sales per employee for this months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table 
        removeWrapper 
        aria-label="Example static collection table" 
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        >
          <TableHeader>
            <TableColumn>NAME</TableColumn>
            <TableColumn>ROLE</TableColumn>
            <TableColumn key="name" allowsSorting>SALES</TableColumn>
          </TableHeader>    
          <TableBody isLoading={loading}>
            {items.map((user, index) => (
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
                  <TableCell>{user.totalSales}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
