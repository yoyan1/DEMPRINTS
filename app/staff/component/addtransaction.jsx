"use client";

import React, { useState, useEffect } from "react";

import {
  // Checkbox,
  // Link,
  Input,
  Select,
  SelectItem,
  Button,
} from "@nextui-org/react";

// import { MdOutlineAlternateEmail, MdOutlineLock } from "react-icons/md";

import { customer_types } from "./data";
import axios from "axios";

export default function Addtransaction() {
  const [customer_name, setCostumerName] = useState("");
  const [customer_type, setCostumerType] = useState("");
  const [item_name, setItemName] = useState("");
  const [transaction_no] = useState(0);
  const [item_no] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [unit_cost, setUnitCost] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [remarks] = useState("");
  const [payment_options, setPaymentMethod] = useState("");
  const [sales_person, setSalesPerson] = useState("");
  const [success_message, setSuccessMessage] = useState("");
  const [payment_type, setPaymentType] = useState('');
  // ----------------------
  const [payment, setPaymentt] = useState([]);
  const [paymentTypes, setPaymenttype] = useState([]);
  const [products, setProduct] = useState([]);
  const [transactions, setTransaction] = useState([]);
  // ----------------------

  useEffect(() => {
    fetchPayment();
    fetchProduct();
    fetchTransactions();
    fetchPaymentType();
  }, []);

  const fetchPayment = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/master/getPaymentOptions`
      );
      setPaymentt(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchPaymentType = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/master/getPaymentType`
      );
      setPaymenttype(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/master/products`
      );
      setProduct(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/collection/getTransaction`
      );
      setTransaction(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/collection/deletetransaction/${id}`
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    // event.preventDefault();
    try {
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
      const formattedTime = currentDate.toTimeString().split(" ")[0];
      const response = await axios.post(
        `http://localhost:5000/api/collection/addtransaction`,
        {
          date: formattedDate,
          time: formattedTime,
          transaction_no,
          item_no,
          item_name,
          unit_cost,
          quantity,
          amount,
          discount,
          total,
          customer_type,
          customer_name,
          payment_type,
          payment_options,
          sales_person,
          remarks,
        }
      );

      setSuccessMessage("Transaction added successfully!");

      console.log(response.data);
    } catch (error) {
      console.log("Failed", error);
    }
  };

  const handleClose = () => {
    // FormData={
    //   costumer_name:'',
    //       customer_type :"",
    //       item_name:'',
    //       quantity:'',
    //       unit_cost:'',
    //       discount: '',
    //       amount:'',
    //       total:'',
    //        payment_options,:'',
    //       sales_person:'',
    // }
    setSuccessMessage("");
  };
  // ----------------------------------

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/collection/getTransaction"
        );
        setTransactions(response.data); // Assuming the response is an array
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchTransactions();
  }, []);

  // ----------------------------------

  return (
    <>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <div className="w-full md:w-1/2">
          <Select
            label="Item"
            className="max-w-xs text-black mb-3"
            autoFocus
            isRequired
            value={item_name}
            variant="bordered"
            style={{ color: "black" }}
            onChange={(event) => setItemName(event.target.value)}
          >
            {products.map((products) => (
              <SelectItem
                key={products.name}
                variant="bordered"
                style={{ color: "black" }}
              >
                {products.name}
              </SelectItem>
            ))}
          </Select>

          <Input
            className="text-black mb-3"
            style={{ color: "black" }}
            autoFocus
            isRequired
            value={unit_cost}
            type="text"
            label="Unit Cost"
            variant="bordered"
            onChange={(event) => setUnitCost(event.target.value)}
          />
          <Input
            className="text-black mb-3"
            style={{ color: "black" }}
            autoFocus
            isRequired
            type="text"
            value={quantity}
            label="Quantity"
            variant="bordered"
            onChange={(event) => setQuantity(event.target.value)}
          />
          <Input
            className="text-black mb-3"
            style={{ color: "black" }}
            autoFocus
            isRequired
            type="text"
            value={discount}
            label="Discount"
            variant="bordered"
            onChange={(event) => setDiscount(event.target.value)}
          />
          <Input
            className="text-black mb-3"
            style={{ color: "black" }}
            autoFocus
            isRequired
            type="text"
            value={amount}
            label="Amount"
            variant="bordered"
            onChange={(event) => setAmount(event.target.value)}
          />
        </div>
        <div className="w-full md:w-1/2">
          <Input
            className="text-black mb-3"
            style={{ color: "black" }}
            autoFocus
            isRequired
            type="text"
            value={total}
            label="Total"
            variant="bordered"
            onChange={(event) => setTotal(event.target.value)}
          />
          <Select
            label="Costumer Type"
            className="max-w-xs text-black mb-3"
            autoFocus
            isRequired
            variant="bordered"
            value={customer_type}
            style={{ color: "black" }}
            onChange={(event) => setCostumerType(event.target.value)}
          >
            {customer_types.map((customer_type) => (
              <SelectItem
                variant="bordered"
                key={customer_type.label}
                style={{ color: "black" }}
              >
                {customer_type.label}
              </SelectItem>
            ))}
          </Select>
          <Input
            className="text-black mb-3"
            style={{ color: "black" }}
            autoFocus
            isRequired
            type="text"
            value={customer_name}
            label="Costumer Name"
            variant="bordered"
            onChange={(event) => setCostumerName(event.target.value)}
          />

          <Select
            label="Payment Option"
            className="max-w-xs text-black mb-3"
            autoFocus
            isRequired
            variant="bordered"
            value={payment_options}
            style={{ color: "black" }}
            onChange={(event) => setPaymentMethod(event.target.value)}
          >
            {payment.map((method) => (
              <SelectItem
                key={method.name}
                variant="bordered"
                style={{ color: "black" }}
              >
                {method.name}
              </SelectItem>
            ))}
          </Select>
          <Select
            label="Payment Type"
            className="max-w-xs text-black mb-3 "
            variant="bordered"
            autoFocus
            value={payment_type}
            onchange={(event) => setPaymentType(event.target.value)}
          >
            {paymentTypes.map((paymenttp) => (
              <SelectItem className='text-black' variant="bordered" key={paymenttp.name}>
                {paymenttp.name}
              </SelectItem>
            ))}
          </Select>

          <Input
            className="text-black mb-3"
            style={{ color: "black" }}
            autoFocus
            isRequired
            type="text"
            value={sales_person}
            label="Sales Person"
            variant="bordered"
            onChange={(event) => setSalesPerson(event.target.value)}
          />
          <div>
            <Button
              color="primary"
              style={{ width: "4rem" }}
              onPress={handleSubmit}
              type="submit"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
      {success_message && (
        <div
          id="toast-undo"
          class="flex items-center w-full max-w-xs p-1 "
          role="alert"
        >
          <div className="text-sm font-normal text-green-900">
            {success_message}
          </div>
          <div className="flex items-center ms-auto space-x-2 rtl:space-x-reverse">
            <a
              className="text-sm font-medium text-blue-600 p-1.5 hover:bg-blue-100 rounded-lg dark:text-blue-500 dark:hover:bg-gray-700"
              href="#"
            ></a>
            <button
              type="button"
              className="ms-auto -mx-1.5 -my-1.5 bg-black text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 p-1.5"
              data-dismiss-target="#toast-undo"
              aria-label="Close"
              onClick={handleClose}
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
