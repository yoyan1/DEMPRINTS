"use client"
import React, { useEffect } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Listbox, ListboxItem} from "@nextui-org/react";
import { FaCodePullRequest } from "react-icons/fa6";
import { useRequestStore } from "../../../stores/requestStore";

export default function Requests() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const {loading, error, requestData, fetchRequest} = useRequestStore()

  useEffect(()=> {
    fetchRequest()
    console.log(requestData)
  }, [])

  return (
    <>
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">User Requests</ModalHeader>
              <ModalBody>
                <span>{error}</span>
                {requestData? (
                    <Listbox variant="flat" aria-label="Listbox menu with descriptions" >
                        {requestData.map((item) => {
                            <ListboxItem
                            key="new"
                            description={`${item.name} request change password`}
                            startContent={<FaCodePullRequest className="bg-gray-200 p-2" />}
                            >
                            Change Password Request
                            </ListboxItem>
                        })}
                    </Listbox>

                ) : null}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}