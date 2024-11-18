"use client";
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";
import { Tabs, Tab, Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";
import { CiShoppingCart } from "react-icons/ci";
import axios from "axios";
import Delete from "./actions/Delete";
import UpdateProduct from "./form/updateProduct";
// import { Input } from "@nextui-org/react";

export default function CreateProduct() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toast } = useToast()
  const [selected, setSelected] = useState("category");
  const [key, setKey] = useState("list");
  const [ errorMessage, setErrorMessages ] = useState({})
  const [category, setCategory] = useState([]);
  const [category_name, setCategoryName] = useState("");
  const [unit, setUnit] = useState("");
  const [measurement, setMeasurement] = useState([]);
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    unit: "",
    price: 0,
  });

  const fetchProductsData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/master/productCategory`
      );
      setCategory(response.data);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/master/productMeasurement`
      );
      setMeasurement(res.data);
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/master/products`
      );
      setProducts(result.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchProductsData();
  }, []);

  const handleOpen = () => {
    onOpen();
  };

  // const handleProductDataChange = (e) =>{
  //   const [name, value] = e.target

  //   setProductData((prevData) => ({
  //     ...prevData,
  //     [name]: value
  //   }))
  // }

  const categoryIsValid = () => {
    const errors = {};
    if (!category_name) errors.category_name = "This field must not be empty.";

    setErrorMessages(errors);
    return errors;
    
  }
  const [isLoading, setIsLoading] = useState(false);
  const submitCategory = async (e) => {
    e.preventDefault()

    const errors = categoryIsValid()
    if(Object.keys(errors).length !== 0){
      return
    }

    setIsLoading(true);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/master/createCategory`,
      { category_name: category_name }
    );
    console.log(response);
    toast({
      variant: "outline",
      title: "Success!",
      color: "success",
      description: response.data,
    })
    setIsLoading(false);
    fetchProductsData();
    setCategoryName("");
  };

  const unitIsValid = () => {
    const errors = {};
    if (!unit) errors.unit = "This field must not be empty.";
    setErrorMessages(errors);
    return errors;
    
  }
  const submitMeasurement = async (e) => {
    e.preventDefault()

    const errors = unitIsValid()
    if(Object.keys(errors).length !== 0){
      return
    }

    setIsLoading(true);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/master/createMeasurement`,
      { unit: unit }
    );
    console.log(response);
    toast({
      variant: "outline",
      title: "Success!",
      color: "success",
      description: response.data,
    })
    setIsLoading(false);
    fetchProductsData();
    setUnit("");
  };

  const productIsValid = () => {

    const errors = {};
    if(!productData.name) errors.name = "This field must not be empty."
    if(!productData.category) errors.category = "This field must not be empty."
    if(!productData.unit) errors.product_unit = "This field must not be empty."
    if(!productData.price) errors.price = "This field must not be empty."
    if(productData.price <= 0) errors.price = "Price is invalid."

    setErrorMessages(errors);
    return errors;
    
  }
  const submitProduct = async (e) => {
    e.preventDefault()

    const errors = productIsValid()
    if(Object.keys(errors).length !== 0){
      return
    }

    setIsLoading(true);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/master/createProduct`,
      productData
    );
    console.log(response);

    setProductData({ name: "", category: "", unit: "", price: 0 });
    setIsLoading(false);
    fetchProductsData();
    setKey("list");
  };

  // const update = (data) =>{
  //   setKey('new')
  //   setProductData(data)
  //   console.log(data)
  // }

  const done = (data) => {
    console.log(data);
    fetchProductsData();
  };
  return (
    <>
      <div className="p-md">
        <Button color="primary" onPress={handleOpen}>
          View details
        </Button>
        <Modal
          size="lg"
          isOpen={isOpen}
          onClose={onClose}
          scrollBehavior="outside"
        >
          <ModalContent>
            {() => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Product Master Data
                </ModalHeader>
                <ModalBody>
                  <div>
                    <Tabs
                      fullWidth
                      size="md"
                      color="primary"
                      aria-label="Tabs colors"
                      radius="full"
                      selectedKey={selected}
                      onSelectionChange={setSelected}
                    >
                      <Tab key="category" title="Category">
                        <form onSubmit={submitCategory} className="flex flex-col gap-4">
                          <span>Create Product Category</span>
                          <Input
                            isRequired
                            label="Category"
                            placeholder="Enter category"
                            isInvalid={errorMessage.category_name? true : false}
                            color={errorMessage.category_name ? "danger" : ""}
                            errorMessage={errorMessage.category_name}
                            value={category_name}
                            onChange={(e) => setCategoryName(e.target.value)}
                          />
                          <div className="flex gap-2 justify-end">
                            <Button
                              type="submit"
                              fullWidth
                              color="primary"
                              isLoading={isLoading}
                              spinner={
                                <svg
                                  className="animate-spin h-5 w-5 text-current"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  />
                                  <path
                                    className="opacity-75"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    fill="currentColor"
                                  />
                                </svg>
                              }
                            >
                              Submit
                            </Button>
                          </div>
                        </form>
                        <Listbox
                          aria-label="Listbox Variants"
                          color="solid"
                          topContent={<span>List of Category</span>}
                        >
                          {category.map((item) => (
                            <ListboxItem showDivider key={item.name}>
                              <div className="flex justify-between items-center">
                                {item.name}
                                <div>
                                  <UpdateProduct
                                    data={item}
                                    type="Category"
                                    done={done}
                                  />
                                  <Delete
                                    id={item._id}
                                    type="Category"
                                    done={done}
                                    collection="products"
                                  />
                                </div>
                              </div>
                            </ListboxItem>
                          ))}
                        </Listbox>
                      </Tab>
                      <Tab key="unit" title="Measurement">
                        <form onSubmit={submitMeasurement} className="flex flex-col gap-4">
                          <span>Create Unit of Measurement</span>
                          <Input
                            isRequired
                            label="Unit"
                            placeholder="Unit of measurement"
                            isInvalid={errorMessage.unit? true : false}
                            color={errorMessage.unit ? "danger" : ""}
                            errorMessage={errorMessage.unit}
                            value={unit}
                            onChange={(e) => setUnit(e.target.value)}
                          />
                          <div className="flex gap-2 justify-end">
                            <Button
                              fullWidth
                              type="submit"
                              color="primary"
                              isLoading={isLoading}
                              spinner={
                                <svg
                                  className="animate-spin h-5 w-5 text-current"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  />
                                  <path
                                    className="opacity-75"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    fill="currentColor"
                                  />
                                </svg>
                              }
                            >
                              Submit
                            </Button>
                          </div>
                        </form>
                        <Listbox
                          aria-label="Listbox Variants"
                          color="solid"
                          topContent={<span>List Unit of Measurements</span>}
                        >
                          {measurement.map((item) => (
                            <ListboxItem showDivider key={item.name}>
                              <div className="flex justify-between items-center">
                                {item.name}
                                <div>
                                  <UpdateProduct
                                    data={item}
                                    type="Measurement"
                                    done={done}
                                  />
                                  <Delete
                                    id={item._id}
                                    type="Measurement"
                                    done={done}
                                    collection="products"
                                  />
                                </div>
                              </div>
                            </ListboxItem>
                          ))}
                        </Listbox>
                      </Tab>
                      <Tab key="create" title="Product">
                        <Tabs
                          fullWidth
                          size="sm"
                          color="primary"
                          aria-label="Tabs colors"
                          radius="full"
                          selectedKey={key}
                          onSelectionChange={setKey}
                        >
                          <Tab key="list" title="All Products">
                            <Listbox
                              aria-label="Listbox Variants"
                              color="solid"
                              topContent={<span>All Products</span>}
                            >
                              {products.map((product) => (
                                <ListboxItem
                                  key={product.name}
                                  showDivider
                                  className="group h-auto py-3"
                                  startContent={
                                    <div className="flex items-center rounded-small justify-center w-7 h-7 bg-primary/10 text-primary">
                                      <CiShoppingCart />
                                    </div>
                                  }
                                  textValue={product.name}
                                >
                                  <div className="flex w-full items-center">
                                    <div className="flex-1 flex flex-col gap-1">
                                      <span className="flex justify-between">
                                        {product.name}{" "}
                                        <span className="text-success">
                                          ₱ {product.price}
                                        </span>
                                      </span>
                                      <div className="px-2 py-1 rounded-small bg-default-100 group-data-[hover=true]:bg-default-200">
                                        <span className="text-tiny text-default-600">
                                          {product.category}
                                        </span>
                                        <div className="flex gap-2 text-tiny">
                                          <span className="text-default-500">
                                            {product.unit}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <UpdateProduct
                                        data={product}
                                        type="Product"
                                        category={category}
                                        measurement={measurement}
                                        done={done}
                                      />
                                      <Delete
                                        id={product._id}
                                        type="Product"
                                        done={done}
                                        collection="products"
                                      />
                                    </div>
                                  </div>
                                </ListboxItem>
                              ))}
                            </Listbox>
                          </Tab>
                          <Tab key="new" title="Create new">
                            <form onSubmit={submitProduct} className="flex flex-col gap-4">
                              <span>Create Product</span>
                              <Select
                                label="Select an category"
                                isInvalid={errorMessage.category? true : false}
                                color={errorMessage.category ? "danger" : ""}
                                errorMessage={errorMessage.category}
                                value={productData.category}
                                name="category"
                                onChange={(e) =>
                                  setProductData((prevData) => ({
                                    ...prevData,
                                    category: e.target.value,
                                  }))
                                }
                              >
                                {category.map((item) => (
                                  <SelectItem key={item.name}>
                                    {item.name}
                                  </SelectItem>
                                ))}
                              </Select>
                              <Input
                                isRequired
                                label="Product name"
                                placeholder="Enter product name"
                                isInvalid={errorMessage.name? true : false}
                                color={errorMessage.name ? "danger" : ""}
                                errorMessage={errorMessage.name}
                                value={productData.name}
                                name="name"
                                onChange={(e) =>
                                  setProductData((prevData) => ({
                                    ...prevData,
                                    name: e.target.value,
                                  }))
                                }
                              />
                              <Select
                                label="Select a unit"
                                isInvalid={errorMessage.product_unit? true : false}
                                color={errorMessage.product_unit ? "danger" : ""}
                                errorMessage={errorMessage.product_unit}
                                value={productData.unit}
                                name="unit"
                                onChange={(e) =>
                                  setProductData((prevData) => ({
                                    ...prevData,
                                    unit: e.target.value,
                                  }))
                                }
                              >
                                {measurement.map((item) => (
                                  <SelectItem key={item.name} value={item.name}>
                                    {item.name}
                                  </SelectItem>
                                ))}
                              </Select>

                              <Input
                                type="number"
                                label="Product price"
                                placeholder="Enter product name"
                                isInvalid={errorMessage.price? true : false}
                                color={errorMessage.price ? "danger" : ""}
                                errorMessage={errorMessage.price}
                                value={productData.price}
                                name="price"
                                onChange={(e) =>
                                  setProductData((prevData) => ({
                                    ...prevData,
                                    price: e.target.value,
                                  }))
                                }
                              />
                              <div className="flex gap-2 justify-end">
                                <Button
                                  type="submit"
                                  fullWidth
                                  color="primary"
                                  isLoading={isLoading}
                                  spinner={
                                    <svg
                                      className="animate-spin h-5 w-5 text-current"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                      />
                                      <path
                                        className="opacity-75"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        fill="currentColor"
                                      />
                                    </svg>
                                  }
                                >
                                  Submit
                                </Button>
                              </div>
                            </form>
                          </Tab>
                        </Tabs>
                      </Tab>
                    </Tabs>
                  </div>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
}
