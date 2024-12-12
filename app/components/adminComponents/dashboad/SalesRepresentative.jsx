import React, { useEffect } from "react";
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

export default function SalesRepresentative() {
  const { users, loading, fetchUsers } = useUserStore()
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const pages = Math.ceil(users.length / rowsPerPage);
  useEffect(()=>{
    fetchUsers()
  }, [fetchUsers])

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users, rowsPerPage]);

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
                  <TableCell>{100 * index}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
