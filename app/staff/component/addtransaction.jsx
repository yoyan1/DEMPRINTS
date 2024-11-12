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

import { customer_types, transactions } from "./data";
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
  const [paid_amount, setPaidAmount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [remarks] = useState("");
  const [payment_options, setPaymentMethod] = useState("");
  const [sales_person, setSalesPerson] = useState("");
  const [success_message, setSuccessMessage] = useState("");
  const [payment_type, setPaymentType] = useState("");
  // ----------------------

  const [payment, setPaymentt] = useState([]);
  const [paymentTypes, setPaymenttype] = useState([]);
  const [products, setProduct] = useState([]);
  const [unit, setUnit] = useState([]);
  const [setTransaction] = useState([]);
  // ----------------------
  const [idGenerated, setIdGenerated] = useState([{ _id: "", count: 0 }]);
  // ----------------------

  useEffect(() => {
    fetchPayment();
    fetchProduct();
    fetchTransactions();
    fetchPaymentType();
    fetchID();
  }, []);

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
        `http://localhost:5000/api/collection/getTransaction`
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
  //       `http://localhost:5000/api/collection/deletetransaction/${id}`
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

      const newId = idGenerated[0].count + 1; // Ensure `idGenerated` is correctly set
      const transaction_no = `000${newId}`;

      // Retrieve the selected product and its price
      const selectedProduct = products.find((item) => item.name === item_name);
      const finalUnitCost = selectedProduct ? selectedProduct.price : unit_cost; // Use the product's price from the DB
      const totalAmount = amount - discount; // Ensure correct total calculation
      // const finalTotal = amount - discount - paid_amount;
      // Send the transaction data
      const response = await axios.post(
        `https://demprints-backend.vercel.app/api/collection/addtransaction`,
        {
          date: formattedDate,
          time: formattedTime,
          transaction_no,
          item_no: "0000",
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

  const handleQuantityChange = (newQuantity) => {
    const selectedProduct = products.find((item) => item.name === item_name);
    const totalItemCost = selectedProduct
      ? selectedProduct.price * newQuantity
      : unit_cost * newQuantity; // Use price from DB
    setQuantity(newQuantity);
    setAmount(totalItemCost); // Update amount based on quantity change
    setTotal(totalItemCost - discount); // Recalculate total after discount
  };

  const handleDiscountChange = (newDiscount) => {
    const discountValue = parseFloat(newDiscount) || 0; // Ensure discount is a number, default to 0
    setDiscount(discountValue); // Update discount value
  
    // Calculate discount amount based on percentage or direct value
    const discountAmount = discountValue > 100 ? discountValue : (amount * discountValue) / 100;
  
    // Calculate total after applying discount and then subtracting the paidAmount
    const newTotal = amount - discountAmount - paid_amount;
    setTotal(newTotal);
  };
  
  

  const handleUnitCostChange = (newUnitCost) => {
    const newAmount = newUnitCost * quantity;
    setUnitCost(newUnitCost);
    setAmount(newAmount);
  
    // Calculate total after applying discount and subtracting paid amount
    const discountAmount = discount > 100 ? discount : (newAmount * discount) / 100;
    const newTotal = newAmount - discountAmount - paid_amount;
    setTotal(newTotal);
  };
  

  const handlePaidAmount = (newPaidAmount) => {
    const parsedPaidAmount = parseFloat(newPaidAmount) || 0; // Ensure it's a number (default to 0 if invalid)
    setPaidAmount(parsedPaidAmount);
  
    // Recalculate total after applying discount and paid amount
    const discountAmount = discount > 100 ? discount : (amount * discount) / 100;
    const newTotal = amount - discountAmount - parsedPaidAmount;
    setTotal(newTotal);
  };
  

  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   const selectedProduct = products.find((item) => item.name === item_name);
  //   const unitCost = selectedProduct ? selectedProduct.price : unit_cost;

  //   const newQuantity =
  //     name === "quantity" ? Math.max(parseFloat(value), 0) : quantity;
  //   const newDiscount = name === "discount" ? parseFloat(value) : discount;

  //   // Calculate total item cost (amount)
  //   const totalItemCost = unitCost * newQuantity;
  //   const total = totalItemCost - newDiscount;

  //   // Update state values based on changed field
  //   if (name === "quantity") {
  //     setQuantity(newQuantity);
  //     setAmount(totalItemCost); // Update the amount based on unit cost and quantity
  //     setTotal(total); // Set total after discount
  //   } else if (name === "discount") {
  //     setDiscount(newDiscount);
  //     setTotal(total);
  //   } else if (name === "amount") {
  //     setAmount(parseFloat(value));
  //   }

  //   setUnitCost(unitCost); // Always set the unit cost

  //   console.log("Updated Sales Data:", {
  //     quantity: newQuantity,
  //     unit_cost: unitCost,
  //     amount: totalItemCost,
  //     discount: newDiscount,
  //     total,
  //   });
  // };

  // const handleDiscountChange = (e) =>{
  //   const { name, value } = e.target;
  // }

  // const handleDiscountChange = () => {
  //   const { name, value } = e.target;

  //   const selectedProduct = products.find((item) => item.name === item_name);
  //   if (selectedProduct) {
  //     const unitCost = selectedProduct.price;

  //     const total = unitCost * value;

  //     if (name === "quantity") {
  //       setQuantity(value);
  //       setUnitCost(unitCost);
  //       setAmount(total);
  //       setTotal(total);
  //     } else if (name === "discount") {
  //       setDiscount(value);
  //     }

  //     console.log("Updated Sales Data:", {
  //       quantity: value,
  //       unit_cost: unitCost,
  //       amount: total,
  //       total: total,
  //     });
  //   }
  // }

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
            handleQuantityChange(quantity); // Recalculate amount and total based on the updated quantity and unit cost
          }}
        >
          {products.map((product) => (
            <SelectItem
              key={product.name}
              variant="bordered"
              style={{ color: "black" }}
            >
              {product.name}
            </SelectItem>
          ))}
        </Select>

        {item_name && (
          <Select
            label="Measurement"
            className="max-w-md mx-auto text-black relative z-0 w-full mb-1 mt-5"
            autoFocus
            isRequired
            value={unit_cost}
            variant="bordered"
            style={{ color: "black" }}
            onChange={(event) => {
              const selectedUnitCost = parseFloat(event.target.value);
              handleUnitCostChange(selectedUnitCost); // Use handleUnitCostChange here
            }}
          >
            {products
              .filter((product) => product.name === item_name)
              .map((product) => (
                <SelectItem
                  key={`${product.unit}-${product.price}`}
                  variant="bordered"
                  value={product.price} // Set price as the value for selection
                  style={{ color: "black" }}
                >
                  {product.unit} - ₱{product.price}
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
          label="Discount"
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
          value={total}
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
          {customer_types.map((type) => (
            <SelectItem
              variant="bordered"
              key={type.label}
              style={{ color: "black" }}
            >
              {type.label}
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

      <div className="grid md:grid-cols-2 md:gap-6">
        <Input
          className="text-black relative z-0 w-full mb-1"
          style={{ color: "black" }}
          autoFocus
          isRequired
          type="text"
          value={sales_person}
          label="Sales Person"
          variant="bordered"
          onChange={(event) => setSalesPerson(event.target.value)}
        />
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

      <div className="flex">
        <p>Amount: ₱{amount.toFixed(2)}</p>
        <p>Total after discount: ₱{total.toFixed(2)}</p>
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
