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
  ModalHeader,
  Textarea,
  CheckboxGroup,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { decodeToken } from '@/app/utils/decodeToken';
import { useUserStore } from '@/app/stores/userStore';
import axios from 'axios';
// import { formatDate } from "../../composables/formateDateAndTime";

// import { useUserStore } from '../../stores/userStore';

export default function Addtransaction() {
  // ----Auth-------------------
  const router = useRouter();
  const [user, setUser] = useState({});
  // -----Loading-----------------

  // ---------------------------------------------
  const [customer_name, setCostumerName] = useState(' ');
  const [customer_type, setCostumerType] = useState(' ');
  const [item_name, setItemName] = useState(' ');

  const [transaction_no] = useState(0);
  const [item_no] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [unit_cost, setUnitCost] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [amount_paid, setPaidAmount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [total_amount, setTotal] = useState(0);
  const [remarks, setRemarks] = useState(0);
  const [payment_options, setPaymentMethod] = useState(' ');
  const [sales_person, setSalesPerson] = useState(' ');
  const [success_message, setSuccessMessage] = useState(' ');
  const [payment_type, setPaymentType] = useState(' ');
  // const [employee_id, setEmployeId] = useState(0)
  // ----------------------
  const { users, fetchUsers } = useUserStore();
  // ----------------------

  const [payment, setPaymentt] = useState(['']);
  const [paymentTypes, setPaymenttype] = useState(['']);
  const [costumerType, setCostumertype] = useState(['']);
  const [products, setProduct] = useState(['']);
  // const [unit, setUnit] = useState(['']);
  const [setTransaction] = useState(['']);
  const [categories, setCategory] = useState(['']);
  const [sub_total] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState('');
  const [selectedMeasurement, setSelectedMeasurement] = useState([]);

  const [variants, setVariant] = useState('');
  const [measurement, setMeasurement] = useState('');
  // ------------------------
  const [filteredVariants, setFilteredVariants] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredMeasurements, setFilteredMeasurements] = useState([]);
  // ------------------------
  const [isSubmiting, setisSubmmiting] = useState(false);
  // ----------------------
  const [idGenerated, setIdGenerated] = useState([{ _id: '', count: 0 }]);
  // ----------------------
  // const [selected, setSelected] = useState(false);
  const [isPercentage, setIsPercentage] = useState(false);
  // ----------------------
  const [selectedCategory, setSelectedCategory] = useState([]);
  // ---------------------------

  useEffect(() => {
    // getAuthenticateUser();
    fetchUsers();
    fetchPayment();
    fetchCostumerType();
    fetchProduct();
    fetchTransactions();
    fetchPaymentType();
    fetchID();
    fetchCategory();
    // ----------------------

    const loadUser = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        const decode = await decodeToken(token);
        setUser(decode);

        if (user) {
          // const currentTime = Math.floor(Date.now() / 1000);
          // if (decode.exp < currentTime) {
          //   localStorage.removeItem("token");
          //   router.replace("/");
          //   return;
          // }

          if (!['staff'].includes(decode.role)) {
            router.replace('/');
            localStorage.removeItem('token');
          }
        }
        // setLoading(false);
      } else {
        router.replace('/');
      }
    };

    loadUser();
  }, [router]);

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
    try {
      const response = await axios.get(
        `https://demprints-backend.vercel.app/api/master/productCategory`,
        `${process.env.NEXT_PUBLIC_API_URL}/master/products`,
      );
      setCategory(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
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
      // const finalTotal = amount - discount - amount_paid;
      // Send the transaction data
      const findUser = sales_person
        ? users.filter((row) => sales_person === row.name)
        : [];
      // const getData = await axios.get(
      //   `https://demprints-backend.vercel.app/api/collection/getTransaction`,
      //   `${process.env.NEXT_PUBLIC_API_URL}/collection/getTransaction`,
      // );
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
          sub_total,
          discount,
          discount_type: isPercentage ? '%' : '₱',
          total_amount: total_amount,
          customer_type,
          customer_name,
          payment_type,
          payment_options,
          sales_person: user.name,
          remarks: remarks,
          employee_id: findUser.length > 0 ? findUser[0].id : user.id,
        },
      );
      // console.log(getData.data);
      // console.log('user ID added', user._id);
      console.log(updateId.data);

      setSuccessMessage('Transaction added successfully!');
      setItemName('');
      setQuantity();
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
    setTotal(totalItemCost - discount);
  };

  const handleDiscountChange = (newDiscount) => {
    const discountValue = parseFloat(newDiscount) || 0;
    setDiscount(discountValue);

    const discountAmount =
      isPercentage && discountValue <= 100
        ? (amount * discountValue) / 100
        : discountValue;

    const newTotal = amount - discountAmount - amount_paid;
    setTotal(newTotal);
  };
  const handleCheckBoxChange = () => {
    const newIsPercentage = !isPercentage; // Toggle the percentage flag
    setIsPercentage(newIsPercentage);

    // Recalculate the discount amount based on the new checkbox state
    const discountAmount =
      newIsPercentage && discount <= 100 ? (amount * discount) / 100 : discount;

    // Recalculate total with the updated discount logic
    const newTotal = amount - discountAmount - amount_paid;
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
        <ModalHeader>Add Transaction</ModalHeader>
        <ModalBody className="">
          <div className=" flex gap-6 ">
            <div className="flex-1 max-w-4xl mx-auto">
              {/* Category */}
              <Select
                size="sm"
                label="Category"
                className="mb-2"
                autoFocus
                isRequired
                variant="bordered"
                style={{ color: 'black' }}
                onChange={(e) => setSelectedCategory(e.target.value)} // Track selected category
              >
                {categories.map((category, index) =>
                  (index > 0 && category.name !== categories[index - 1].name) ||
                  index === 0 ? (
                    <SelectItem
                      key={category.name}
                      variant="bordered"
                      style={{ color: 'black' }}
                    >
                      {category.name}
                    </SelectItem>
                  ) : null,
                )}
              </Select>

              {selectedCategory && (
                <div className="flex gap-3 mb-2">
                  {/* Product Selection */}
                  <Select
                    size="sm"
                    label="Item"
                    className="w-full max-w-md mx-auto text-black relative z-0 mb-2"
                    autoFocus
                    isRequired
                    value={item_name}
                    variant="bordered"
                    style={{ color: 'black' }}
                    onChange={(e) => {
                      const selectedProductName = e.target.value;
                      const selectedProduct = products.find(
                        (product) => product.name === selectedProductName,
                      );

                      // Update state for selected product details
                      setItemName(selectedProductName);
                      setUnitCost(selectedProduct?.price || 0);
                      const filteredVariants = products.filter(
                        (product) =>
                          product.name === selectedProductName &&
                          product.category === selectedCategory,
                      );
                      setFilteredVariants(filteredVariants);
                      setMeasurement(''); // Reset measurement when item changes
                      setAmount(0);
                      setTotal(0);
                    }}
                  >
                    {products
                      .filter(
                        (product) => product.category === selectedCategory,
                      )
                      .reduce((uniqueProducts, product) => {
                        if (
                          !uniqueProducts.find((p) => p.name === product.name)
                        ) {
                          uniqueProducts.push(product);
                        }
                        return uniqueProducts;
                      }, [])
                      .map((product) => (
                        <SelectItem
                          key={product.id || product.name}
                          value={product.name}
                          variant="bordered"
                          style={{ color: 'black' }}
                        >
                          {product.name}
                        </SelectItem>
                      ))}
                  </Select>

                  {/* Variant Selection */}
                  {item_name && filteredVariants.length > 0 && (
                    <Select
                      size="sm"
                      label="Variants"
                      className="w-full max-w-md mx-auto"
                      placeholder="Select variants"
                      isDisabled={filteredVariants.length === 0} // Corrected condition
                      onChange={(e) => {
                        const selectedVariant = e.target.value;
                        setVariant(selectedVariant);
                        const selectedVariantProduct = filteredVariants.find(
                          (product) => product.variants === selectedVariant,
                        );
                        setUnitCost(selectedVariantProduct?.price || 0);
                      }}
                    >
                      {filteredVariants.map((product) => (
                        <SelectItem
                          key={product.variants}
                          value={product.variants}
                        >
                          {product.variants}
                        </SelectItem>
                      ))}
                    </Select>
                  )}

                  {/* Unit Selection */}
                  {variants && (
                    <Select
                      size="sm"
                      label="Measurement"
                      className="w-full max-w-md mx-auto text-black relative z-0 mb-2"
                      placeholder="Select unit"
                      isDisabled={filteredVariants.length === 0}
                      value={measurement}
                      onChange={(e) => {
                        const selectedUnit = e.target.value;
                        setMeasurement(selectedUnit);
                        const selectedUnitProduct = filteredVariants.find(
                          (product) => product.unit === selectedUnit,
                        );
                        setUnitCost(selectedUnitProduct?.price || 0);
                      }}
                    >
                      {[
                        ...new Set(
                          filteredVariants.map((product) => product.unit),
                        ),
                      ].map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                </div>
              )}

              <div className="flex gap-3 mb-2">
                <Input
                  size="sm"
                  className="w-full max-w-md mx-auto text-black relative z-0 mb-2"
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

                <div className="flex items-center w-full max-w-md mx-auto text-black relative z-0 mb-2">
                  <Input
                    size="sm"
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
                  <CheckboxGroup className="bg-dark p-2 border border-gray-400">
                    <Checkbox
                      className="w-8 h-8 text-blue-600"
                      checked={isPercentage}
                      size="sm"
                      onChange={handleCheckBoxChange}
                    >
                      %
                    </Checkbox>
                  </CheckboxGroup>
                </div>
              </div>
              <div className="flex gap-3 mb-2">
                {/* Customer Type Select */}
                <Select
                  size="sm"
                  label="Customer Type"
                  className="w-full max-w-md mx-auto text-black relative z-0 mb-2"
                  autoFocus
                  isRequired
                  variant="bordered"
                  value={customer_type}
                  style={{ color: 'black' }}
                  onChange={(event) => setCostumerType(event.target.value)}
                >
                  {costumerType.map((type) => (
                    <SelectItem
                      key={type.name}
                      variant="bordered"
                      style={{ color: 'black' }}
                    >
                      {type.name}
                    </SelectItem>
                  ))}
                </Select>

                {/* Costumer Name */}
                <Input
                  size="sm"
                  className="w-full max-w-md mx-auto text-black relative z-0 mb-2"
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
              <div className="flex gap-3 mb-2">
                {/* Payment Option Select */}
                <Select
                  size="sm"
                  label="Payment Option"
                  className="w-full max-w-md mx-auto text-black relative z-0 mb-2"
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

                {/* Payment Type Select */}
                <Select
                  size="sm"
                  label="Payment Type"
                  className="w-full max-w-md mx-auto text-black relative z-0 mb-2"
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

              <div className="justify-between">
                <p></p>
              </div>
              {payment_type === 'Down payment' && (
                <div className="w-full max-w-md mx-auto text-black relative z-0 mb-2">
                  <Input
                    size="sm"
                    className="w-full text-black relative z-0"
                    style={{ color: 'black' }}
                    autoFocus
                    isRequired
                    type="text"
                    value={amount_paid}
                    label="Amount Paid"
                    variant="bordered"
                    onChange={(e) => handlePaidAmount(e.target.value)}
                  />
                </div>
              )}
            </div>

            <div className="flex-1 border border-gray-300 p-3 ">
              <div className="flex justify-between mb-5">
                <span>Produt Cost</span>
                <span>{unit_cost}</span>
              </div>
              <div className="flex justify-between mb-5">
                <span>Total Amount: </span>
                <span>{Math.round(sub_total)}</span>
              </div>

              <div className="flex justify-between mb-5">
                <span>Discount</span>

                <span>
                  {Math.round(discount)}
                  {isPercentage ? '%' : '₱'}{' '}
                </span>
              </div>
              <div className="flex justify-between mb-5">
                <span>Discount Applied</span>
                <span>{Math.round(amount - sub_total)}</span>
              </div>
              <div className="flex justify-between mb-5">
                <span className="bold">Total Amout after Discount :</span>
                <span>{Math.round(total_amount)}</span>
              </div>
              {amount_paid ? (
                <div className="flex justify-between">
                  <span>Balance </span>
                  {Math.round(total_amount - amount_paid)}
                </div>
              ) : null}
            </div>
          </div>
          <Textarea
            isRequired
            // label="Remarks"
            // labelPlacement="inside"

            placeholder="Write Remarks...."
            className="w-full"
          />
          {success_message && (
            <div className="flex items-center w-full max-w-xs p-1 mb-3">
              <div className="text-sm font-normal text-green-900">
                {success_message}
              </div>
            </div>
          )}
        </ModalBody>
        <ModalFooter className=" justify-end">
          <Button
            color="primary"
            style={{ width: '4rem' }}
            onClick={handleSubmit}
            type="submit"
            isDisabled={isSubmiting}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  );
}
