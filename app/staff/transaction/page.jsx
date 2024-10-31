import React from 'react'

export default function page() {
  return (
    <div>
      
    </div>
  )
}

// "use client";

// import React, { useState, useEffect } from "react";

// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
//   Input,
//   Button,
//   DropdownTrigger,
//   Dropdown,
//   DropdownMenu,
//   DropdownItem,
//   Chip,
//   User,
//   Pagination,
// } from "@nextui-org/react";
// import {
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   useDisclosure,
//   // Checkbox,
//   // Link,
//   Select,
//   SelectItem,
// } from "@nextui-org/react";

// // import { MdOutlineAlternateEmail, MdOutlineLock } from "react-icons/md";
// import { FaFilePen } from "react-icons/fa6";

// import { columns, users, statusOptions, customer_types } from "./data";
// import axios from "axios";

// const statusColorMap = {
//   active: "success",
//   paused: "danger",
//   vacation: "warning",
// };

// const INITIAL_VISIBLE_COLUMNS = [
//   "date",
//   "time",
//   "transaction_no",
//   "item_no",
//   "item_name",
//   "quantity",
//   "unit_cost",
//   "amount",
//   "discount",
//   "total",
//   "customer_type",
//   "customer_name",
//   "payment_method",
//   "sales_person",
//   "remarks",
//   "actions",
// ];

// export default function App() {
//   // -----------------------
//   const { isOpen, onOpen, onOpenChange } = useDisclosure();
//   // const variants = [""];
//   //  ----------------------
//   const [filterValue, setFilterValue] = React.useState("");
//   const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
//   const [visibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
//   // const [statusFilter] = React.useState("all");

//   // ----------------------------------

//   const [customer_name, setCostumerName] = useState("");
//   const [customer_type, setCostumerType] = useState("");
//   const [item_name, setItemName] = useState("");
//   const [transaction_no] = useState(0)
//   const [item_no] = useState(0)
//   const [quantity, setQuantity] = useState(0);
//   const [unit_cost, setUnitCost] = useState(0);
//   const [discount, setDiscount] = useState(0);
//   const [amount, setAmount] = useState(0);
//   const [total, setTotal] = useState(0);
//   const [remarks] = useState('')
//   const [payment_method, setPaymentMethod] = useState("");
//   const [sales_person, setSalesPerson] = useState("");
//   const [success_message, setSuccessMessage] = useState("");
//   // ----------------------
//   const [payment, setPaymentt] = useState([]);
//   const [products, setProduct] = useState([]);
//   const [transactions, setTransaction] = useState([]);
//   // ----------------------

//   useEffect(() => {
//     fetchPayment();
//     fetchProduct();
//     fetchTransactions();
//   }, []);

//   const fetchPayment = async () => {
//     try {
//       const response = await axios.get(
//         `https://demprints-backend.vercel.app/api/master/getPaymentOptions`
//       );
//       setPaymentt(response.data);
//       console.log(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const fetchProduct = async () => {
//     try {
//       const response = await axios.get(
//         `https://demprints-backend.vercel.app/api/master/products`
//       );
//       setProduct(response.data);
//       console.log(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const fetchTransactions = async () => {
//     try {
//       const response = await axios.get(
//         `https://demprints-backend.vercel.app/api/collection/getTransaction`
//       );
//       setTransaction(response.data);
//       console.log(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const response = await axios.delete(
//         `https://demprints-backend.vercel.app/api/collection/deletetransaction/${id}`
//       );
//       console.log(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleSubmit = async () => {
//     // event.preventDefault();
//     try {
//       const currentDate = new Date();
//       const formattedDate = currentDate.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
//       const formattedTime = currentDate.toTimeString().split(" ")[0];
//       const response = await axios.post(
//         `https://demprints-backend.vercel.app/api/collection/addtransaction`
//         ,
//         {
//           date:formattedDate,
//           time:formattedTime,
//           transaction_no,
//           item_no,
//           item_name,
//           unit_cost,
//           quantity,
//           amount,
//           discount,
//           total,
//           customer_type,
//           customer_name,
//           payment_method,
//           sales_person,
//           remarks,
//         }
//       );

//       setSuccessMessage("Transaction added successfully!");

//       console.log(response.data);
//     } catch (error) {
//       console.log("Failed", error);
//     }
//   };

//   const handleClose = () => {
//     // FormData={
//     //   costumer_name:'',
//     //       customer_type :"",
//     //       item_name:'',
//     //       quantity:'',
//     //       unit_cost:'',
//     //       discount: '',
//     //       amount:'',
//     //       total:'',
//     //       payment_method:'',
//     //       sales_person:'',
//     // }
//     setSuccessMessage("");
//   };
//   // ----------------------------------
//   const [searchInput, setSearchInput] = useState("");
//   const [transactiones, setTransactions] = useState([]);
//   const [filteredResults, setFilteredResults] = useState([]);

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         const response = await axios.get(
//           "https://demprints-backend.vercel.app/api/collection/getTransaction"
//         );
//         setTransactions(response.data); // Assuming the response is an array
//       } catch (error) {
//         console.error("Error fetching transactions:", error);
//       }
//     };
//     fetchTransactions();
//   }, []);

//   const handleSearch = () => {
//     const results = transactions.filter(
//       (transaction) =>
//         transaction.costumer_name &&
//         transaction.costumer_name
//           .toLowerCase()
//           .includes(searchInput.toLowerCase())
//     );

//     setFilteredResults(results);
//   };

//   // ----------------------------------

//   return (
//     <>
//       <Modal
//         isOpen={isOpen}
//         onOpenChange={onOpenChange}
//         size="2xl"
//         placement="top-center"
//         className=""
//       >
//         <ModalContent
//           className="inset-0    justify-center z-50"
//           style={{ width: "50rem" }}
//         >
//           {(onClose) => (
//             <>
//               <ModalHeader className="flex flex-col gap-1 text-black">
//                 <h3>Add Transaction</h3>
//               </ModalHeader>

//               <ModalBody>
//                 <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
//                   <div className="w-full md:w-1/2">
//                     <Select
//                       label="Item"
//                       className="max-w-xs text-black mb-3"
//                       autoFocus
//                       isRequired
//                       value={item_name}
//                       variant="bordered"
//                       style={{ color: "black" }}
//                       onChange={(event) => setItemName(event.target.value)}
//                     >
//                       {products.map((products) => (
//                         <SelectItem
//                         key={products.name}
//                           variant="bordered"
//                           style={{ color: "black" }}
//                         >
//                           {products.name}
//                         </SelectItem>
//                       ))}
//                     </Select>

//                     <Input
//                       className="text-black mb-3"
//                       style={{ color: "black" }}
//                       autoFocus
//                       isRequired
//                       value={unit_cost}
//                       type="text"
//                       label="Unit Cost"
//                       variant="bordered"
//                       onChange={(event) => setUnitCost(event.target.value)}
//                     />
//                     <Input
//                       className="text-black mb-3"
//                       style={{ color: "black" }}
//                       autoFocus
//                       isRequired
//                       type="text"
//                       value={quantity}
//                       label="Quantity"
//                       variant="bordered"
//                       onChange={(event) => setQuantity(event.target.value)}
//                     />
//                     <Input
//                       className="text-black mb-3"
//                       style={{ color: "black" }}
//                       autoFocus
//                       isRequired
//                       type="text"
//                       value={discount}
//                       label="Discount"
//                       variant="bordered"
//                       onChange={(event) => setDiscount(event.target.value)}
//                     />
//                     <Input
//                       className="text-black mb-3"
//                       style={{ color: "black" }}
//                       autoFocus
//                       isRequired
//                       type="text"
//                       value={amount}
//                       label="Amount"
//                       variant="bordered"
//                       onChange={(event) => setAmount(event.target.value)}
//                     />
//                   </div>
//                   <div className="w-full md:w-1/2">
//                     <Input
//                       className="text-black mb-3"
//                       style={{ color: "black" }}
//                       autoFocus
//                       isRequired
//                       type="text"
//                       value={total}
//                       label="Total"
//                       variant="bordered"
//                       onChange={(event) => setTotal(event.target.value)}
//                     />
//                     <Select
//                       label="Costumer Type"
//                       className="max-w-xs text-black mb-3"
//                       autoFocus
//                       isRequired
//                       variant="bordered"
//                       value={customer_type}
//                       style={{ color: "black" }}
//                       onChange={(event) => setCostumerType(event.target.value)}
//                     >
//                       {customer_types.map((customer_type) => (
//                         <SelectItem
//                           variant="bordered"
//                           key={customer_type.label}
//                           style={{ color: "black" }}
//                         >
//                           {customer_type.label}
//                         </SelectItem>
//                       ))}
//                     </Select>
//                     <Input
//                       className="text-black mb-3"
//                       style={{ color: "black" }}
//                       autoFocus
//                       isRequired
//                       type="text"
//                       value={customer_name}
//                       label="Costumer Name"
//                       variant="bordered"
//                       onChange={(event) => setCostumerName(event.target.value)}
//                     />

//                     <Select
//                       label="Payment Method"
//                       className="max-w-xs text-black mb-3"
//                       autoFocus
//                       isRequired
//                       variant="bordered"
//                       value={payment_method}
//                       style={{ color: "black" }}
//                       onChange={(event) => setPaymentMethod(event.target.value)}
//                     >
//                       {payment.map((method) => (
//                         <SelectItem
//                           key={method.name}
//                           variant="bordered"
//                           style={{ color: "black" }}
//                         >
//                           {method.name}
//                         </SelectItem>
//                       ))}
//                     </Select>

//                     <Input
//                       className="text-black mb-3"
//                       style={{ color: "black" }}
//                       autoFocus
//                       isRequired
//                       type="text"
//                       value={sales_person}
//                       label="Sales Person"
//                       variant="bordered"
//                       onChange={(event) => setSalesPerson(event.target.value)}
//                     />
//                   </div>
//                 </div>
//                 {success_message && (
//                   <div
//                     id="toast-undo"
//                     class="flex items-center w-full max-w-xs p-1 "
//                     role="alert"
//                   >
//                     <div className="text-sm font-normal text-green-900">
//                       {success_message}
//                     </div>
//                     <div className="flex items-center ms-auto space-x-2 rtl:space-x-reverse">
//                       <a
//                         className="text-sm font-medium text-blue-600 p-1.5 hover:bg-blue-100 rounded-lg dark:text-blue-500 dark:hover:bg-gray-700"
//                         href="#"
//                       ></a>
//                       <button
//                         type="button"
//                         className="ms-auto -mx-1.5 -my-1.5 bg-black text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 p-1.5"
//                         data-dismiss-target="#toast-undo"
//                         aria-label="Close"
//                         onClick={handleClose}
//                       >
//                         <span className="sr-only">Close</span>
//                         <svg
//                           className="w-3 h-3"
//                           aria-hidden="true"
//                           fill="none"
//                           viewBox="0 0 14 14"
//                         >
//                           <path
//                             stroke="currentColor"
//                             stroke-linecap="round"
//                             stroke-linejoin="round"
//                             stroke-width="2"
//                             d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
//                           />
//                         </svg>
//                       </button>
//                     </div>
//                     {/* <button
//                       type="button"
//                       className="close"
//                       onClick={() => setSuccessMessage("")}
//                     ></button> */}
//                   </div>
//                 )}
//               </ModalBody>

//               <ModalFooter>
//                 <Button
//                   color="primary"
//                   style={{ width: "4rem" }}
//                   onPress={handleSubmit}
//                   type="submit"
//                 >
//                   Save
//                 </Button>
//               </ModalFooter>
//             </>
//           )}
//         </ModalContent>
//       </Modal>

//       <div className="overflow-x-auto">
//         <header>
//           <nav
//             className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 mt-5 mb-5 shadow "
//             style={{
//               borderRadius: "10px",
//               boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, 0.1)",
//               padding: "8px",
//             }}
//           >
//             <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
//               <div className="flex justify-start items-center">
//                 <div>
//                   <form
//                     onSubmit={(e) => {
//                       e.preventDefault(); // Prevent form submission
//                       handleSearch();
//                     }}
//                     className="hidden md:block md:pl-2"
//                   >
//                     <label htmlFor="topbar-search" className="sr-only">
//                       Search
//                     </label>
//                     <div className="relative md:w-64 md:w-96">
//                       <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
//                         <svg
//                           className="w-5 h-5 text-gray-500 dark:text-gray-400"
//                           fill="currentColor"
//                           viewBox="0 0 20 20"
//                         >
//                           <path
//                             fillRule="evenodd"
//                             clipRule="evenodd"
//                             d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
//                           ></path>
//                         </svg>
//                       </div>
//                       <input
//                         type="text"
//                         id="topbar-search"
//                         className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 pl-10 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
//                         placeholder="Search by customer name"
//                         value={searchInput}
//                         onChange={(e) => setSearchInput(e.target.value)}
//                       />
//                     </div>
//                   </form>
//                 </div>
//               </div>
//               <div className="flex items-center lg:order-2">
//                 <Button
//                   className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
//                   onPress={onOpen}
//                   size="sm"
//                   color="primary"
//                 >
//                   <FaFilePen />
//                   Add
//                 </Button>

//                 <button
//                   data-collapse-toggle="mobile-menu-2"
//                   type="button"
//                   className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//                   aria-controls="mobile-menu-2"
//                   aria-expanded="false"
//                 >
//                   <span className="sr-only">Open main menu</span>
//                 </button>
//               </div>
//               <div
//                 className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
//                 id="mobile-menu-2"
//               ></div>
//             </div>
//           </nav>
//         </header>

//         <Table
//           aria-label="Example table with custom cells, pagination and sorting"
//           isHeaderSticky
//           // bottomContent={bottomContent}
//           bottomContentPlacement="outside"
//           classNames=""
//           // selectedKeys={selectedKeys}
//           selectionMode="multiple"
//           // sortDescriptor={sortDescriptor}
//           // topContent={topContent}
//           topContentPlacement="outside"
//           onSelectionChange={setSelectedKeys}
//           // onSortChange={setSortDescriptor}
//         >
//           <TableHeader>
//             {columns.map((column) => (
//               <TableColumn
//                 key={column.uid}
//                 align={column.uid === "actions" ? "center" : "start"}
//                 allowsSorting={column.sortable}
//               >
//                 {column.name}
//               </TableColumn>
//             ))}
//           </TableHeader>
//           <TableBody emptyContent={"No transaction found"}>
//             {transactions.map((transaction, index) => (
//               <TableRow key={transaction.id}>
//                 <TableCell className="text-black"></TableCell>
//                 <TableCell className="text-black">{transaction.date}</TableCell>
//                 <TableCell className="text-black"></TableCell>
//                 {/* <TableCell className="text-black">{index + 1}</TableCell> */}
//                 <TableCell className="text-black">
//                   {transaction.item_name}
//                 </TableCell>
//                 <TableCell className="text-black">
//                   {transaction.quantity}
//                 </TableCell>
//                 <TableCell className="text-black">
//                   {transaction.amount}
//                 </TableCell>
//                 <TableCell className="text-black">
//                   {transaction.discount}
//                 </TableCell>
//                 <TableCell className="text-black">
//                   {transaction.total}
//                 </TableCell>
//                 <TableCell className="text-black">
//                   {transaction.unit_cost}
//                 </TableCell>
//                 <TableCell className="text-black">
//                   {transaction.customer_type}
//                 </TableCell>
//                 <TableCell className="text-black">
//                   {transaction.costumer_name}
//                 </TableCell>
//                 <TableCell className="text-black">
//                   {transaction.payment_method}
//                 </TableCell>
//                 <TableCell className="text-black">
//                   {transaction.payment_method}
//                 </TableCell>
//                 <TableCell className="text-black">
//                   {transaction.sales_person}
//                 </TableCell>{" "}
//                 <TableCell className="text-black"></TableCell>
//                 <TableCell className="text-black">
//                   <Button onPress={() => handleDelete(transaction._id)}>
//                     Delete
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </>
//   );
// }
