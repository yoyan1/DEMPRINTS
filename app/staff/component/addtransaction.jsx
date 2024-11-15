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


import axios from "axios";
// import { formatDate } from "../../composables/formateDateAndTime";

import { useUserStore } from "../../stores/userStore";

export default function Addtransaction() {
  const {user , getAuthenticateUser} = useUserStore();


  // ---------------------------------------------
  const [customer_name, setCostumerName] = useState(" ");
  const [customer_type, setCostumerType] = useState(" ");
  const [item_name, setItemName] = useState("");

  const [transaction_no] = useState(0);
  const [item_no] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [unit_cost, setUnitCost] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [paid_amount, setPaidAmount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [remarks, setRemarks] = useState(0);
  const [payment_options, setPaymentMethod] = useState(" ");
  const [sales_person, setSalesPerson] = useState(" ");
  const [success_message, setSuccessMessage] = useState(" ");
  const [payment_type, setPaymentType] = useState(" ");
  const [employee_id, setEmployeId] = useState('')
  // ----------------------

  const [payment, setPaymentt] = useState([""]);
  const [paymentTypes, setPaymenttype] = useState([""]);
  const [costumerType, setCostumertype] = useState([""]);
  const [products, setProduct] = useState([""]);
  const [unit, setUnit] = useState([""]);
  const [setTransaction] = useState([""]);
  // ----------------------
  const [idGenerated, setIdGenerated] = useState([{ _id: "", count: 0 }]);
  // ----------------------

  useEffect(() => {
    getAuthenticateUser()
    fetchPayment();
    fetchCostumerType();
    fetchProduct();
    fetchTransactions();
    fetchPaymentType();
    fetchID();
  }, [getAuthenticateUser]);

  const fetchCostumerType = async () => {
    try {
      const response = await axios.get(
        `https://demprints-backend.vercel.app/api/master/getCustomerType`
      );
      setCostumertype(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchPayment = async () => {
    try {
      const response = await axios.get(
        `https://demprints-backend.vercel.app/api/master/getPaymentOptions`
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
        `https://demprints-backend.vercel.app/api/master/getPaymentType`
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
        `https://demprints-backend.vercel.app/api/master/products`
      );
      setProduct(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchID = async () => {
    try {
      const response = await axios.get(
        `https://demprints-backend.vercel.app/api/collection/getId`
      );
      if (response.data.length > 0) {
        setIdGenerated(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        `https://demprints-backend.vercel.app/api/collection/getTransaction`
      );
      setTransaction(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleDelete = async (id) => {
  //   try {
  //     const response = await axios.delete(
  //       `https://demprints-backend.vercel.app/api/collection/deletetransaction/${id}`
  //     );
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSubmit = async () => {
    try {
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
      const formattedTime = currentDate.toTimeString().split(" ")[0];

      const responseID = await axios.get(
        `https://demprints-backend.vercel.app/api/collection/getId`
      );

      const generatedID =
        responseID.data.length > 0 ? responseID.data : [{ _id: "", count: 0 }];
      const newId = generatedID[0].count + 1; // Ensure `idGenerated` is correctly set
      const transaction_no = () => {
        if (newId >= 1000) {
          return `${newId}`;
        } else if (newId >= 100) {
          return `0${newId}`;
        } else if (newId >= 10) {
          return `00${newId}`;
        } else {
          return `000${newId}`;
        }
      };

      // Retrieve the selected product and its price
      const selectedProduct = products.find((item) => item.name === item_name);
      const finalUnitCost = selectedProduct ? selectedProduct.price : unit_cost; // Use the product's price from the DB
      // const totalAmount = amount - discount; // Ensure correct total calculation
      // const finalTotal = amount - discount - paid_amount;
      // Send the transaction data
      const updateId = await axios.post(
        "https://demprints-backend.vercel.app/api/collection/updateID",
        { id: idGenerated[0]._id, count: newId }
      );
      const response = await axios.post(
        `https://demprints-backend.vercel.app/api/collection/addtransaction`,
        {
          date: formattedDate,
          time: formattedTime,
          transaction_no: transaction_no(),
          item_no,
          item_name,
          unit_cost: finalUnitCost,
          quantity,
          amount,
          discount,
          total: total, // Send the calculated total
          customer_type,
          customer_name,
          payment_type,
          payment_options,
          sales_person: user.name,
          remarks: remarks, //calculate the balance
          employee_id: user._id,
          // employee_id: user.id,

        }
       
        
      );
      console.log(user);
      console.log(updateId.data);
      setSuccessMessage("Transaction added successfully!");
      setItemName("");
      setQuantity("");
      setDiscount("");
      setPaidAmount("");
      setAmount("");
      setTotal("");
      setUnitCost(0);
      setCostumerType("");
      setCostumerName("");
      setPaymentMethod("");
      setPaymentType("");
      setSalesPerson("");
      setRemarks("");
      console.log(response.data);
    } catch (error) {
      console.log("Failed", error);
    }
  };

  const handleQuantityChange = (newQuantity) => {
    const selectedProduct = products.find((item) => item.name === item_name && item.unit === unit_cost);
    const totalItemCost = selectedProduct
      ? selectedProduct.price * newQuantity
      : 0;
    setQuantity(newQuantity);
    setAmount(totalItemCost);
    setTotal(totalItemCost - discount); // Recalculate total after discount
  };

  const handleDiscountChange = (newDiscount) => {
    const discountValue = parseFloat(newDiscount) || 0;
    setDiscount(discountValue); // Update discount value

    // Calculate discount amount based on percentage or direct value
    const discountAmount =
      discountValue > 100
        ? discountValue
        : Math.round(amount * discountValue) / 100;

    // Calculate total after applying discount and then subtracting the paidAmount

    const newTotal = amount - discountAmount - paid_amount;
    const roundOfftotal = Math.round(newTotal * 100) / 100;
    setTotal(roundOfftotal);
  };

  const handleUnitCostChange = (newUnitCost) => {
    // const newAmount =  quantity;
    setUnitCost(newUnitCost);
    setQuantity(0);
    setAmount(0);
    setTotal(0)

  };

  const handlePaidAmount = (newPaidAmount) => {
    const parsedPaidAmount = parseFloat(newPaidAmount) || 0; // Ensure it's a number (default to 0 if invalid)
    setPaidAmount(parsedPaidAmount);

    // Recalculate total after applying discount and paid amount
    const discountAmount =
      discount > 100 ? discount : (amount * discount) / 100;
    const newTotal = amount - discountAmount - parsedPaidAmount;
    const roundOfftotal = Math.round(newTotal * 100) / 100;
    setRemarks(roundOfftotal);
  };

  const handleClose = () => {

    setSuccessMessage("");
  };
  // ----------------------------------

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          "https://demprints-backend.vercel.app/api/collection/getTransaction"
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
      <div className="flex gap-3">
        <Select
          label="Item"
          className="max-w-md mx-auto text-black relative z-0 w-full mb-1 mt-5"
          autoFocus
          isRequired
          value={item_name}
          variant="bordered"
          style={{ color: "black" }}
          onChange={(event) => {
            const selectedProductName = event.target.value;
            const selectedProduct = products.find(
              (product) => product.name === selectedProductName
            );

            setItemName(selectedProductName);
            setUnitCost(selectedProduct?.price || 0); // Set initial unit cost
            handleQuantityChange(quantity);
            setUnitCost('')
            setQuantity(0);
            setAmount(0);
            setTotal(0)
          }}
        >
          {products.map((product, index) =>
            index > 0 ? (
              product.name !== products[index - 1].name ? (
                <SelectItem
                  key={product.name}
                  variant="bordered"
                  style={{ color: "black" }}
                >
                  {product.name}
                </SelectItem>
              ) : null
            ) : (
              <SelectItem
                key={product.name}
                variant="bordered"
                style={{ color: "black" }}
              >
                {product.name}
              </SelectItem>
            )
          )}
        </Select>

        {item_name && (
          <Select
            label="Measurement"
            className="max-w-md mx-auto text-black relative z-0 w-full mb-1 mt-5"
            autoFocus
            isRequired
            value={unit_cost}
            variant="bordered"
            onChange={(event) => { handleUnitCostChange(event.target.value); }}
          >
            {products
              .filter((product) => product.name === item_name) // Filter by product name
              .map((product) => (
                <SelectItem
                  key={product.unit}
                  variant="bordered" // Set product price as the value
                >
                  {product.unit}
                  {/* Display unit and price */}
                </SelectItem>
              ))}
          </Select>
        )}
      </div>

      <div className="grid md:grid-cols-2 md:gap-6">
        <Input
          className="text-black relative z-0 w-full mb-1"
          style={{ color: "black" }}
          autoFocus
          isRequired
          value={quantity}
          label="Quantity"
          variant="bordered"
          type="number"
          name="quantity"
          onChange={(e) => handleQuantityChange(e.target.value)}
        />
        <Input
          className="text-black relative z-0 w-full mb-1"
          style={{ color: "black" }}
          autoFocus
          isRequired
          value={discount}
          name="discount"
          label="Discount (%)"
          variant="bordered"
          onChange={(e) => handleDiscountChange(e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-2 md:gap-6">
        <Input
          className="text-black relative z-0 w-full mb-1"
          style={{ color: "black" }}
          autoFocus
          isRequired
          value={amount}
          label="Amount"
          variant="bordered"
          name="amount"
          readOnly
        />
        <Input
          className="text-black relative z-0 w-full mb-1"
          style={{ color: "black" }}
          autoFocus
          isRequired
          value={total ? Math.round(parseFloat(total) * 100) / 100 : "00:00"}
          label="Total"
          variant="bordered"
          readOnly
        />
      </div>

      <div className="grid md:grid-cols-2 md:gap-6">
        <Select
          label="Customer Type"
          className="max-w-xs text-black relative z-0 w-full mb-1"
          autoFocus
          isRequired
          variant="bordered"
          value={customer_type}
          style={{ color: "black" }}
          onChange={(event) => setCostumerType(event.target.value)}
        >
          {costumerType.map((type) => (
            <SelectItem
              variant="bordered"
              key={type.name}
              style={{ color: "black" }}
            >
              {type.name}
            </SelectItem>
          ))}
        </Select>
        <Input
          className="text-black relative z-0 w-full mb-1"
          style={{ color: "black" }}
          autoFocus
          isRequired
          type="text"
          value={customer_name}
          label="Customer Name"
          variant="bordered"
          onChange={(event) => setCostumerName(event.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-2 md:gap-6">
        <Select
          label="Payment Option"
          className="max-w-xs text-black relative z-0 w-full mb-1"
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
          className="max-w-xs text-black relative z-0 w-full mb-1"
          variant="bordered"
          autoFocus
          value={payment_type}
          onChange={(event) => setPaymentType(event.target.value)}
        >
          {paymentTypes.map((type) => (
            <SelectItem
              key={type.name}
              variant="bordered"
              style={{ color: "black" }}
            >
              {type.name}
            </SelectItem>
          ))}
        </Select>
      </div>
      {payment_type === "Down payment" && (
        <div className="">
          {/* <Input
          className="text-black relative z-0 w-full mb-1"
          style={{ color: "black" }}
          autoFocus
          isRequired
          type="text"
          value={sales_person}
          label="Sales Person"
          variant="bordered"
          onChange={(event) => setSalesPerson(event.target.value)}
        /> */}
          <Input
            className="text-black relative z-0 w-full mb-1"
            style={{ color: "black" }}
            autoFocus
            isRequired
            type="text"
            value={paid_amount}
            label="Paid Amount"
            variant="bordered"
            onChange={(e) => handlePaidAmount(e.target.value)}
          />
        </div>
      )}

      <div className="flex">
        <p className="gap-3">Amount: ₱{Math.round(amount)}</p>
        <p>Total : ₱{Math.round(total)}</p>
      </div>

      <div className="relative z-0 w-full mb-3 group">
        <Button
          color="primary"
          style={{ width: "4rem" }}
          onClick={handleSubmit}
          type="submit"
        >
          Save
        </Button>
      </div>

      {success_message && (
        <div className="flex items-center w-full max-w-xs p-1" role="alert">
          <div className="text-sm font-normal text-green-900">
            {success_message}
          </div>
          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-black text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 p-1.5"
            aria-label="Close"
            onClick={() => setSuccessMessage("")}
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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
