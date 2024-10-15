"use client"
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { FaExpand } from "react-icons/fa";
import TransactionTable from './TransactionTable'

export default function ExpandTransaction(props) {
  const {isOpen, onOpen, onClose} = useDisclosure();

  const handleOpen = () => {
    onOpen();
  }

  return (
    <>
      <div class="p-md">
          <Button color="primary" variant="outline" onPress={handleOpen}><FaExpand/></Button>
          <Modal 
              size="full"
              isOpen={isOpen} 
              onClose={onClose} 
          >
              <ModalContent>
              {() => (
                  <>
                  <ModalHeader className="flex flex-col gap-1">Sales Transaction</ModalHeader>
                  <ModalBody>
                      <div>
                        <TransactionTable columns={props.columns} transactions={props.transactions} itemOptions={props.itemOptions} typeOptions={props.typeOptions} isMaximized={true}/>
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
