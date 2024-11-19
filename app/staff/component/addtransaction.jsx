'use client';

import React, { useState, useEffect } from 'react';

import {
  // Checkbox,
  // Link,
  Input,
  Select,
  SelectItem,
  Button,
  Checkbox,
  ModalContent,
  ModalBody,
  ModalFooter,
} from '@nextui-org/react';

import axios from 'axios';
// import { formatDate } from "../../composables/formateDateAndTime";

import { useUserStore } from '../../stores/userStore';

export default function Addtransaction() {
  const { user, getAuthenticateUser } = useUserStore();

  // ---------------------------------------------
  const [customer_name, setCostumerName] = useState(' ');
  const [customer_type, setCostumerType] = useState(' ');
  const [item_name, setItemName] = useState(' ');

  const [transaction_no] = useState(0);
  const [item_no] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [unit_cost, setUnitCost] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [paid_amount, setPaidAmount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [remarks, setRemarks] = useState(0);
  const [payment_options, setPaymentMethod] = useState(' ');
  const [sales_person, setSalesPerson] = useState(' ');
  const [success_message, setSuccessMessage] = useState(' ');
  const [payment_type, setPaymentType] = useState(' ');
  // const [employee_id, setEmployeId] = useState(0)
  // ----------------------

  const [payment, setPaymentt] = useState(['']);
  const [paymentTypes, setPaymenttype] = useState(['']);
  const [costumerType, setCostumertype] = useState(['']);
  const [products, setProduct] = useState(['']);
  const [unit, setUnit] = useState(['']);
  const [setTransaction] = useState(['']);
  const [categories, setCategory] = useState([''])
  // ------------------------
  const [isSubmiting, setisSubmmiting] = useState(false);
  // ----------------------
  const [idGenerated, setIdGenerated] = useState([{ _id: '', count: 0 }]);
  // ----------------------
  // const [selected, setSelected] = useState(false);
  const [isPercentage, setIsPercentage] = useState(false);
  // ----------------------

  useEffect(() => {
    getAuthenticateUser();
    fetchPayment();
    fetchCostumerType();
    fetchProduct();
    fetchTransactions();
    fetchPaymentType();
    fetchID();
    fetchCategory();
  }, [getAuthenticateUser]);

  const fetchCostumerType = async () => {
    try {
      const response = await axios.get(
        `https://demprints-backend.vercel.app/api/master/getCustomerType`,
        `${process.env.NEXT_PUBLIC_API_URL}/master/getCustomerType`,
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
        `https://demprints-backend.vercel.app/api/master/getPaymentOptions`,
        `${process.env.NEXT_PUBLIC_API_URL}/master/getPaymentOptions`,
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
        `https://demprints-backend.vercel.app/api/master/getPaymentType`,
        `${process.env.NEXT_PUBLIC_API_URL}/master/getPaymentType`,
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
        `https://demprints-backend.vercel.app/api/master/products`,
        `${process.env.NEXT_PUBLIC_API_URL}/master/products`,
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
        `https://demprints-backend.vercel.app/api/collection/getId`,
        `${process.env.NEXT_PUBLIC_API_URL}/collection/getId`,
      );
      if (response.data.length > 0) {
        setIdGenerated(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategory = async () => {
    try{
      const response = await axios.get(
        `https://demprints-backend.vercel.app/api/master/productCategory`,
        `${process.env.NEXT_PUBLIC_API_URL}/master/products`,
      );
      setCategory(response.data);
      console.log(response.data);
      
    }catch(error){
      console.log(error);
      
    }
  }
  const fetchTransactions = async () => {
    // setIs;
    try {
      const response = await axios.get(
        `https://demprints-backend.vercel.app/api/collection/getTransaction`,
        `${process.env.NEXT_PUBLIC_API_URL}/collection/getTransaction`,
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
  //       `${process.env.NEXT_PUBLIC_API_URL}/collection/deletetransaction/${id}`
  //     );
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSubmit = async () => {
    setisSubmmiting(true);
    try {
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
      const formattedTime = currentDate.toTimeString().split(' ')[0];

      const responseID = await axios.get(
        `https://demprints-backend.vercel.app/api/collection/getId`,
        `${process.env.NEXT_PUBLIC_API_URL}/collection/getId`,
      );

      const generatedID =
        responseID.data.length > 0 ? responseID.data : [{ _id: '', count: 0 }];
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
        'https://demprints-backend.vercel.app/api/collection/updateID',
        { id: idGenerated[0]._id, count: newId },
      );
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/collection/addtransaction`,
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
          employee_id: user.id,
          // employee_id: user.id,
        },
      );
      console.log('user ID added', user._id);
      console.log(updateId.data);
      setSuccessMessage('Transaction added successfully!');
      setItemName('');
      setQuantity('');
      setDiscount('');
      setPaidAmount('');
      setAmount('');
      setTotal('');
      setUnitCost(0);
      setCostumerType('');
      setCostumerName('');
      setPaymentMethod('');
      setPaymentType('');
      setSalesPerson('');
      setRemarks('');
      console.log(response.data);
    } catch (error) {
      console.log('Failed', error);
    }
  };

  const handleQuantityChange = (newQuantity) => {
    const selectedProduct = products.find(
      (item) => item.name === item_name && item.unit === unit_cost,
    );
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

    // Calculate discount amount based on whether it's a percentage or a fixed value
    const discountAmount =
      isPercentage && discountValue <= 100
        ? (amount * discountValue) / 100
        : discountValue;

    // Calculate total after applying discount and then subtracting the paidAmount
    const newTotal = amount - discountAmount - paid_amount;
    setTotal(newTotal);
  };
  const handleCheckBoxChange = () => {
    const newIsPercentage = !isPercentage; // Toggle the percentage flag
    setIsPercentage(newIsPercentage);

    // Recalculate the discount amount based on the new checkbox state
    const discountAmount =
      newIsPercentage && discount <= 100 ? (amount * discount) / 100 : discount;

    // Recalculate total with the updated discount logic
    const newTotal = amount - discountAmount - paid_amount;
    setTotal(newTotal);
  };

  const handleUnitCostChange = (newUnitCost) => {
    // const newAmount =  quantity;
    setUnitCost(newUnitCost);
    setQuantity(0);
    setAmount(0);
    setTotal(0);
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
    setSuccessMessage('');
  };
  // ----------------------------------

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          'https://demprints-backend.vercel.app/api/collection/getTransaction',
        );
        setTransactions(response.data); // Assuming the response is an array
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
    fetchTransactions();
  }, []);

  // ----------------------------------

  return (
    <>
      <ModalContent>
        <ModalBody className="">
          <div className="">
          <Select
                label="Category"
                className="max-w-md mx-auto text-black relative z-0 w-full mb-1 mt-5"
                autoFocus
                isRequired
                // value={item_name}
                variant="bordered"
                style={{ color: 'black' }}
                // onChange={(event) => {
                //   const selectedProductName = event.target.value;
                //   const selectedProduct = products.find(
                //     (product) => product.name === selectedProductName,
                //   );

                //   setItemName(selectedProductName);
                //   setUnitCost(selectedProduct?.price || 0); // Set initial unit cost
                //   handleQuantityChange(quantity);
                //   setUnitCost('');
                //   setQuantity(0);
                //   setAmount(0);
                //   setTotal(0);
                // }}
              >
                {categories.map((category, index) =>
                  index > 0 ? (
                    category.name !== categories[index - 1].name ? (
                      <SelectItem
                        key={category.name}
                        variant="bordered"
                        style={{ color: 'black' }}
                      >
                        {category.name}
                      </SelectItem>
                    ) : null
                  ) : (
                    <SelectItem
                      key={category.name}
                      variant="bordered"
                      style={{ color: 'black' }}
                    >
                      {category.name}
                    </SelectItem>
                  ),
                )}
              </Select>
            <div className="flex gap-3">
              
              <Select
                label="Item"
                className="max-w-md mx-auto text-black relative z-0 w-full mb-1 mt-5"
                autoFocus
                isRequired
                value={item_name}
                variant="bordered"
                style={{ color: 'black' }}
                onChange={(event) => {
                  const selectedProductName = event.target.value;
                  const selectedProduct = products.find(
                    (product) => product.name === selectedProductName,
                  );

                  setItemName(selectedProductName);
                  setUnitCost(selectedProduct?.price || 0); // Set initial unit cost
                  handleQuantityChange(quantity);
                  setUnitCost('');
                  setQuantity(0);
                  setAmount(0);
                  setTotal(0);
                }}
              >
                {products.map((product, index) =>
                  index > 0 ? (
                    product.name !== products[index - 1].name ? (
                      <SelectItem
                        key={product.name}
                        variant="bordered"
                        style={{ color: 'black' }}
                      >
                        {product.name}
                      </SelectItem>
                    ) : null
                  ) : (
                    <SelectItem
                      key={product.name}
                      variant="bordered"
                      style={{ color: 'black' }}
                    >
                      {product.name}
                    </SelectItem>
                  ),
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
                  onChange={(event) => {
                    handleUnitCostChange(event.target.value);
                  }}
                >
                  {products
                    .filter((product) => product.name === item_name)
                    .map((product) => (
                      <SelectItem key={product.unit} variant="bordered">
                        {product.unit}
                      </SelectItem>
                    ))}
                </Select>
              )}
            </div>{' '}
            <div className="flex gap-3">
              <Input
                className="text-black max-w-md mx-auto relative z-0 w-full mb-1 mt-5"
                style={{ color: 'black' }}
                autoFocus
                isRequired
                value={quantity}
                label="Quantity"
                variant="bordered"
                type="number"
                name="quantity"
                onChange={(e) => handleQuantityChange(e.target.value)}
              />
              <div className="flex max-w-md mx-auto text-black relative z-0 w-full mb-1 mt-5 items-center">
                <Input
                  className="flex-1"
                  value={discount}
                  name="discount"
                  label="Discount"
                  variant="bordered"
                  autoFocus
                  placeholder="Enter your discount"
                  isRequired
                  onChange={(e) => handleDiscountChange(e.target.value)}
                />
                <Checkbox
                  className="flex-1 w-4 h-2 text-blue-600 m-2"
                  checked={isPercentage}
                  size="sm"
                  onChange={handleCheckBoxChange}
                >
                  %
                </Checkbox>
              </div>
            </div>
            {/* <div className="grid md:grid-cols-2 md:gap-6">
            <Input
              className="text-black relative z-0 w-full mb-1"
              style={{ color: 'black' }}
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
              style={{ color: 'black' }}
              autoFocus
              isRequired
              value={
                total ? Math.round(parseFloat(total) * 100) / 100 : '00:00'
              }
              label="Total"
              variant="bordered"
              readOnly
            />
          </div> */}
            <div className="relative z-0 w-full mb-3 group"></div>
            {success_message && (
              <div
                className="flex items-center w-full max-w-xs p-1"
                role="alert"
              >
                <div className="text-sm font-normal text-green-900">
                  {success_message}
                </div>
              </div>
            )}
          </div>
          <div className="">
            <div className="flex ">
              <Select
                label="Customer Type"
                className="flex max-w-md mx-auto  relative z-0 w-full mb-1 mt-5 items-center"
                autoFocus
                isRequired
                variant="bordered"
                value={customer_type}
                style={{ color: 'black' }}
                onChange={(event) => setCostumerType(event.target.value)}
              >
                {costumerType.map((type) => (
                  <SelectItem
                    variant="bordered"
                    key={type.name}
                    style={{ color: 'black' }}
                  >
                    {type.name}
                  </SelectItem>
                ))}
              </Select>
              <Input
                className="text-blackflex max-w-md mx-auto  relative z-0 w-full mb-1 mt-5 items-center"
                style={{ color: 'black' }}
                autoFocus
                isRequired
                type="text"
                value={customer_name}
                label="Customer Name"
                variant="bordered"
                onChange={(event) => setCostumerName(event.target.value)}
              />
            </div>
            <div className="flex">
              <Select
                label="Payment Option"
                className="flex max-w-md mx-auto text-black relative z-0 w-full mb-1 mt-5 items-center"
                autoFocus
                isRequired
                variant="bordered"
                value={payment_options}
                style={{ color: 'black' }}
                onChange={(event) => setPaymentMethod(event.target.value)}
              >
                {payment.map((method) => (
                  <SelectItem
                    key={method.name}
                    variant="bordered"
                    style={{ color: 'black' }}
                  >
                    {method.name}
                  </SelectItem>
                ))}
              </Select>

              <Select
                label="Payment Type"
                className="flex max-w-md mx-auto text-black relative z-0 w-full mb-1 mt-5 items-center"
                variant="bordered"
                autoFocus
                value={payment_type}
                onChange={(event) => setPaymentType(event.target.value)}
              >
                {paymentTypes.map((type) => (
                  <SelectItem
                    key={type.name}
                    variant="bordered"
                    style={{ color: 'black' }}
                  >
                    {type.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
            {payment_type === 'Down payment' && (
              <div className="flex max-w-md mx-auto text-black relative z-0 w-full mb-1 mt-5 items-center">
                <Input
                  className="text-black relative z-0 w-full mb-1"
                  style={{ color: 'black' }}
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
          </div>
        </ModalBody>
        <ModalFooter className="flex justify-between">
          <Button
            color="primary"
            style={{ width: '4rem' }}
            onClick={handleSubmit}
            type="submit"
            isDisabled={isSubmiting}
          >
            Submit
          </Button>
          <div className="flex bg-gray p-2">
            <p className="gap-3 bold mr-3">Amount: ₱{Math.round(amount)}</p>
            <p className='bold'>Total : ₱{Math.round(total)}</p>
          </div>
        </ModalFooter>
      </ModalContent>
    </>
  );
}
