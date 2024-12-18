'use client';

import React, { useState, useEffect, useMemo } from 'react';

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
import { FaSearch } from 'react-icons/fa';
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
  const [item_name, setItemName] = useState('');

  const [transaction_no] = useState(0);
  const [item_no] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [unit_cost, setUnitCost] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [amount_paid, setPaidAmount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [total_amount, setTotal] = useState(0);
  const [balance, setBalance] = useState(0);
  const [remarks, setRemarks] = useState(' ');
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
  const [categories, setCategory] = useState([]);
  const [sub_total, setSubTotal] = useState(unit_cost * quantity);
  const [selectedProductName, setSelectedProductName] = useState('');

  const [item_code, setItemCode] = useState([]);
  // const [selectedVariant, setSelectedVariant] = useState('');
  // const [selectedMeasurement, setSelectedMeasurement] = useState([]);

  const [variants, setVariant] = useState('');
  const [measurement, setMeasurement] = useState('');
  // ------------------------
  const [filteredVariants, setFilteredVariants] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredUnit, setFilteredUnit] = useState([]);
  const [filteredMeasurements, setFilteredMeasurements] = useState([]);
  // ------------------------
  const [isSubmiting, setisSubmmiting] = useState(false);
  // ----------------------
  const [idGenerated, setIdGenerated] = useState([{ _id: '', count: 0 }]);
  // ----------------------
  // const [selected, setSelected] = useState(false);
  const [isPercentage, setIsPercentage] = useState(false);
  // ----------------------
  const [selectedCategory, setSelectedCategory] = useState();
  // ---------------------------
  // const []

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

      const selectedProduct = products.find((item) => item.name === item_name);
      const finalUnitCost = selectedProduct ? selectedProduct.price : unit_cost; // Use the product's price from the DB

      const findUser = sales_person
        ? users.filter((row) => sales_person === row.name)
        : [];

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
          sub_total: sub_total,
          discount: discount,
          discount_type: isPercentage ? '%' : '₱',
          total_amount: total_amount,
          amount_paid: amount_paid > 0 ? amount_paid : total_amount,
          balance: balance,
          customer_type,
          customer_name,
          payment_type,
          payment_options,
          sales_person: user.name,
          remarks,
          employee_id: findUser.length > 0 ? findUser[0].id : user.id,
        },
      );

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
    const parsedQuantity = parseFloat(newQuantity) || 0;
    const totalItemCost = unit_cost * parsedQuantity;

    setQuantity(parsedQuantity);
    setSubTotal(totalItemCost);

    const discountAmount = isPercentage
      ? (totalItemCost * discount) / 100
      : discount;

    const newTotal = totalItemCost - discountAmount;
    setTotal(newTotal);
  };

  const handleDiscountChange = (newDiscount) => {
    const discountValue = parseFloat(newDiscount) || 0;
    setDiscount(discountValue);

    const discountAmount = isPercentage
      ? (sub_total * discountValue) / 100
      : discountValue;

    const newTotal = sub_total - discountAmount;
    setTotal(newTotal);
  };

  const handleCheckBoxChange = () => {
    const newIsPercentage = !isPercentage;
    setIsPercentage(newIsPercentage);

    const discountAmount = newIsPercentage
      ? (sub_total * discount) / 100
      : discount;

    const newTotal = sub_total - discountAmount;
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
    const parsedPaidAmount = parseFloat(newPaidAmount);
    setPaidAmount(parsedPaidAmount);

    const discountAmount = isPercentage
      ? (sub_total * discount) / 100
      : discount;

    const newTotal = sub_total - discountAmount - parsedPaidAmount;
    const roundOffTotal = parseFloat(newTotal * 100) / 100;

    setBalance(roundOffTotal);
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
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
    fetchTransactions();
  }, []);

  const [prevData, setPrevData] = useState({
    price_type: 'fixed',
    category: '',
    item_no: '',
    item_name: '',
    measurement: '',
    variants: '',
    unit_cost: 0,
    quantity: 1,
    sub_total: 0,
    total_amount: 0,
    amount_paid: 0,
  });
  const [productsCategory] = useState([]);

  const handleChangeItemCode = (e) => {
    const code = e.target.value;
    setItemCode(code);

    const findProduct = products.filter((item) => item.item_code === code);

    if (findProduct.length > 0) {
      const product = findProduct[0]; // Get the first matching product
      const findCategory = productsCategory.filter(
        (category) => category.name === product.category,
      );

      const updatedData = {
        price_type: 'custom',
        categories: findCategory.length > 0 ? findCategory : '',
        item_no: code,
        item_name: product.name,
        measurement: product.unit,
        variants: product.variants,
        unit_cost: product.price,
        quantity: 1,
        sub_total: product.price * 1,
        total_amount: product.price * 1,
        amount_paid: 0,
      };

      setFilteredProducts(findProduct);
      setFilteredVariants(findProduct);
      setFilteredUnit(findProduct);
      setPrevData((prevData) => ({ ...prevData, ...updatedData }));

      setItemName(product.name);
      setUnitCost(product.price);
      setMeasurement(product.unit);

      setVariant(product.variants);
      setSubTotal(product.price);
      setTotal(product.price);
    } else {
      const resetData = {
        price_type: 'fixed',
        categories: '',
        item_no: '',
        item_name: '',
        measurement: '',
        variants: '',
        unit_cost: 0,
        quantity: 1,
        sub_total: 0,
        total_amount: 0,
        amount_paid: 0,
      };
      setPrevData((prevData) => ({ ...prevData, ...resetData }));

      setItemName('');
      setUnitCost(0);
      setMeasurement('');
      setVariant('');
      setSubTotal(0);
      setTotal(0);
    }
  };

  // ----------------------------------

  return (
    <>
      <ModalContent>
        <ModalHeader>Add Transaction</ModalHeader>
        <ModalBody className="">
          <div>
            <Input
              autoFocus
              type="search"
              variant="bordered"
              color="primary"
              size="sm"
              value={item_code}
              onChange={handleChangeItemCode}
              label={
                <span className="text-black dark:text-white"> Item Code</span>
              }
            />
          </div>

          <div className=" flex gap-6 ">
            <div className="flex-1 max-w-4xl mx-auto">
              <Select
                size="sm"
                label={
                  <span className="text-black dark:-white">
                    Select Category
                  </span>
                }
                defaultSelectedKeys={[selectedCategory]}
                className="mb-2"
                autoFocus
                isRequired
                variant="bordered"
                color="primary"
                style={{ color: 'black' }}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category, index) =>
                  (index > 0 && category.name !== categories[index - 1].name) ||
                  index === 0 ? (
                    <SelectItem key={category.name} variant="bordered">
                      {category.name}
                    </SelectItem>
                  ) : null,
                )}
              </Select>

              {/* {selectedCategory && ( */}
              <div className="flex gap-3 mb-2">
                <Select
                  size="sm"
                  label={
                    <span className="text-black dark:text-white">
                      Select Item
                    </span>
                  }
                  // defaultSelectedKeys={[item_name]}
                  className="w-full max-w-md mx-auto text-black relative z-0 mb-2"
                  autoFocus
                  isRequired
                  value={item_name}
                  //  defaultSelectedKeys={[products.name]}
                  variant="bordered"
                  color="primary"
                  onChange={(e) => {
                    const selectedProductName = e.target.value;
                    const selectedProduct = products.find(
                      (product) => product.name === selectedProductName,
                    );

                    setItemName(selectedProductName);
                    const filteredVariants = products.filter(
                      (product) =>
                        product.name === selectedProductName &&
                        product.category === selectedCategory,
                    );

                    setFilteredVariants(filteredVariants);
                    setMeasurement('');
                    setAmount(0);
                    setTotal(0);
                    setSelectedProductName(selectedProductName);
                  }}
                >
                  {useMemo(() => {
                    const seen = new Set();
                    const findProducts = products.filter(
                      (item) => item.category === selectedCategory,
                    );
                    console.log(selectedCategory);
                    return findProducts.map((item) => {
                      const value = item.name;
                      if (seen.has(value)) return null;
                      seen.add(value);
                      return <SelectItem key={value}>{value}</SelectItem>;
                    });
                  }, [products, selectedCategory])}
                </Select>

                {item_name && (
                  <Select
                    size="sm"
                    label={
                      <span className="text-black dark:text-white">
                        Select Variant
                      </span>
                    }
                    className="w-full max-w-md mx-auto text-black relative z-0 mb-2"
                    autoFocus
                    isRequired
                    value={variants}
                    defaultSelectedKeys={[variants]}
                    variant="bordered"
                    color="primary"
                    onChange={(e) => {
                      const selectedProductVariants = e.target.value;
                      const selectedProduct = products.find(
                        (product) =>
                          product.variants === selectedProductVariants &&
                          product.name === selectedProductName,
                      );

                      if (!selectedProduct) return;

                      setVariant(selectedProductVariants);

                      const filteredVariants = products.filter(
                        (product) =>
                          product.variants === selectedProductVariants &&
                          product.name === selectedProductName,
                      );

                      setFilteredVariants(filteredVariants);
                      setVariant(selectedProduct);
                    }}
                  >
                    {products
                      .filter((product) => product.name === selectedProductName)
                      .reduce((uniqueVariants, product) => {
                        if (
                          !uniqueVariants.find(
                            (p) => p.variants === product.variants,
                          )
                        ) {
                          uniqueVariants.push(product);
                        }
                        return uniqueVariants;
                      }, [])
                      .map((product) => (
                        <SelectItem
                          key={product.variants}
                          value={product.variants}
                          variant="bordered"
                        >
                          {product.variants}
                        </SelectItem>
                      ))}
                  </Select>
                )}

                {variants && (
                  <Select
                    size="sm"
                    label={
                      <span className="text-black dark:text-white ">
                        Measurement
                      </span>
                    }
                    className="w-full max-w-md mx-auto text-black relative z-0 mb-2"
                    placeholder="Select unit"
                    variant="bordered"
                    color="primary"
                    isDisabled={filteredVariants.length === 0}
                    value={measurement}
                    onChange={(e) => {
                      const selectedUnit = e.target.value;
                      setMeasurement(selectedUnit);

                      const selectedUnitProduct = filteredVariants.find(
                        (product) => product.unit === selectedUnit,
                      );

                      setUnitCost(selectedUnitProduct?.price || 0);
                      setSubTotal(selectedUnitProduct?.price || 0);
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
              {/* )} */}

              <div className="flex gap-3 mb-2">
                <Input
                  size="sm"
                  className="w-full max-w-md mx-auto text-black relative z-0 mb-2"
                  autoFocus
                  isRequired
                  value={quantity}
                  label={
                    <span className="text-black dark:text-white">Quantity</span>
                  }
                  variant="bordered"
                  color="primary"
                  type="number"
                  name="quantity"
                  onChange={(e) => {
                    handleQuantityChange(e.target.value);
                    setMeasurement();
                  }}
                />

                <div className="flex items-center w-full max-w-md mx-auto text-black relative z-0 mb-2">
                  <Input
                    size="sm"
                    className="flex-1"
                    value={discount}
                    name="discount"
                    label={
                      <span className="text-black dark:text-white">
                        Discount
                      </span>
                    }
                    variant="bordered"
                    color="primary"
                    autoFocus
                    placeholder="Enter your discount"
                    isRequired
                    onChange={(e) => handleDiscountChange(e.target.value)}
                  />
                  <CheckboxGroup className="bg-dark pl-5 ">
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
                  label={
                    <span className="text-black dark:text-white">
                      Costumer Type
                    </span>
                  }
                  className="w-full max-w-md mx-auto text-black relative z-0 mb-2"
                  autoFocus
                  isRequired
                  variant="bordered"
                  color="primary"
                  value={customer_type}
                  onChange={(event) => setCostumerType(event.target.value)}
                >
                  {costumerType.map((type) => (
                    <SelectItem key={type.name} variant="bordered">
                      {type.name}
                    </SelectItem>
                  ))}
                </Select>

                {/* Costumer Name */}
                <Input
                  size="sm"
                  className="w-full max-w-md mx-auto text-black relative z-0 mb-2"
                  autoFocus
                  isRequired
                  type="text"
                  value={customer_name}
                  label={
                    <span className="text-black dark:text-white">
                      Costumer Name
                    </span>
                  }
                  variant="bordered"
                  color="primary"
                  onChange={(event) => setCostumerName(event.target.value)}
                />
              </div>
              <div className="flex gap-3 mb-2">
                <Select
                  size="sm"
                  label={
                    <span className="text-black dark:text-white">
                      Payment Option
                    </span>
                  }
                  className="w-full max-w-md mx-auto text-black relative z-0 mb-2"
                  autoFocus
                  isRequired
                  variant="bordered"
                  color="primary"
                  value={payment_options}
                  onChange={(event) => setPaymentMethod(event.target.value)}
                >
                  {payment.map((method) => (
                    <SelectItem key={method.name} variant="bordered">
                      {method.name}
                    </SelectItem>
                  ))}
                </Select>

                <Select
                  size="sm"
                  label={<span className="text-black">Payment Type</span>}
                  className="w-full max-w-md mx-auto text-black relative z-0 mb-2"
                  variant="bordered"
                  color="primary"
                  autoFocus
                  value={payment_type}
                  onChange={(event) => setPaymentType(event.target.value)}
                >
                  {paymentTypes.map((type) => (
                    <SelectItem key={type.name} variant="bordered">
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
                    variant="bordered"
                    color="primary"
                    className="w-full text-black relative z-0"
                    autoFocus
                    isRequired
                    type="number"
                    value={amount_paid}
                    label={
                      <span className="text-black dark:text-white">
                        Amount paid
                      </span>
                    }
                    onChange={(e) => handlePaidAmount(e.target.value)}
                  />
                </div>
              )}
            </div>

            <div className="flex-1 border border-gray-300 p-3">
              <div className="flex justify-between mb-5">
                <span>Product Cost:</span>
                <span>₱{Number(unit_cost).toFixed(2)}</span>
              </div>

              <div className="flex justify-between mb-5">
                <span>Total Amount:</span>
                <span>₱{Number(sub_total).toFixed(2)}</span>
              </div>

              <div className="flex justify-between mb-5">
                <span>Discount:</span>
                <span>
                  {Number(discount)} {isPercentage ? '%' : '₱'}
                </span>
              </div>

              <div className="flex justify-between mb-5">
                <span>Discount Applied:</span>
                <span>
                  {isPercentage
                    ? `₱${(
                        (Number(sub_total) * Number(discount)) /
                        100
                      ).toFixed(2)}`
                    : `₱${Number(discount).toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between mb-5">
                <span className="bold">Total Amount after Discount:</span>
                <span>₱{Number(total_amount).toFixed(2)}</span>
              </div>

              {amount_paid > 0 && (
                <div className="flex justify-between">
                  <span>Balance:</span>
                  <span>
                    ₱{(Number(total_amount) - Number(amount_paid)).toFixed(2)}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div>
            <Textarea
              isRequired
              autoFocus
              variant="bordered"
              color="primary"
              placeholder="Write Remarks...."
              className="w-full"
              onChange={(e) => setRemarks(e.target.value)}
            />
          </div>
          {success_message && (
            <div className="flex items-center w-full max-w-xs p-1 mb-3">
              <div className="text-sm font-normal text-green-900">
                {success_message}
              </div>
            </div>
          )}
        </ModalBody>
        <ModalFooter className=" justify-end">
          <Button variant="danger" onClick={isSubmiting}>
            Close
          </Button>
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
