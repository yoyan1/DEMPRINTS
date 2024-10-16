"use client"
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure} from "@nextui-org/react";
import {Tabs, Tab, Input} from "@nextui-org/react";
import {Select,  SelectItem} from "@nextui-org/select";
import { MdAdd } from 'react-icons/md';
// import { Input } from "@nextui-org/react";

export default function CreateProduct() {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [selected, setSelected] = React.useState("category");

  const handleOpen = () => {
    onOpen();
  }

  return (
    <>
      <div class="p-md">
        <div className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
            </div>
            <div className="py-3 px-6">
            <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
              Product / Services
            </h5>
            </div>
            <div className="p-6 pt-0">
            <Button color="primary" onPress={handleOpen}><MdAdd/> product / service</Button>
            </div>
        </div>
          <Modal 
              size="lg"
              isOpen={isOpen} 
              onClose={onClose} 
          >
              <ModalContent>
              {() => (
                  <>
                  <ModalHeader className="flex flex-col gap-1">Product Master Data</ModalHeader>
                  <ModalBody>
                      <div className="pb-20">
                        <Tabs
                          fullWidth
                          size="md"
                          aria-label="Tabs form"
                          selectedKey={selected}
                          onSelectionChange={setSelected}
                        >
                          <Tab key="category" title="Category">
                            <form className="flex flex-col gap-4">
                              <span>Create Product</span>
                              <Input isRequired label="Category" placeholder="Enter category" type="email" />
                              <div className="flex gap-2 justify-end">
                                <Button fullWidth color="primary">
                                  Submit
                                </Button>
                              </div>
                            </form>
                          </Tab>
                          <Tab key="unit" title="Measurement">
                            <form className="flex flex-col gap-4 h-[300px]">
                              <span>Create Unit of Measurement</span>
                              <Input isRequired label="Unit" placeholder="Unit of measurement" />
                              <div className="flex gap-2 justify-end">
                                <Button fullWidth color="primary">
                                  Submit
                                </Button>
                              </div>
                            </form>
                          </Tab>
                          <Tab key="create" title="Product">
                            <form className="flex flex-col gap-4 h-[300px]">
                              <span>Create Product</span>
                              <Select 
                                label="Select an category" 
                              >
                                  <SelectItem>Category 1</SelectItem>
                                  <SelectItem>Category 2</SelectItem>
                                  <SelectItem>Category 3</SelectItem>
                              </Select>
                              <Input isRequired label="Product name" placeholder="Enter product name" />
                              <Select 
                                label="Select an unit" 
                              >
                                  <SelectItem>Unit 1</SelectItem>
                                  <SelectItem>Unit 2</SelectItem>
                                  <SelectItem>Unit 3</SelectItem>
                              </Select>
                              <Input isRequired label="Product price" placeholder="Enter product name" />
                              <div className="flex gap-2 justify-end">
                                <Button fullWidth color="primary">
                                  Submit
                                </Button>
                              </div>
                            </form>
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
