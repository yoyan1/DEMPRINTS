"use client"
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { useRequestStore } from "@/app/stores/requestStore"

export default function Action({data, refresh}) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const { loading, accept, decline } = useRequestStore()

  const onSubmit = async (isAccept) => {
    if(isAccept){
        const result = await accept(data)
        console.log(result)
        onClose()
        refresh("done")
        return
    }
    decline(data._id)
    refresh("done")
  }
  return (
    <>
      <Button onPress={onOpen} size="sm" color="primary">Action</Button>
      <Modal 
        backdrop="opaque" 
        isOpen={isOpen} 
        onClose={onClose}
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
        }}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">Request</ModalHeader>
              <ModalBody>
                <span>Request changing password</span>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onSubmit(false)} isLoading={loading}>
                  Decline
                </Button>
                <Button color="success" onPress={onSubmit(true)} isLoading={loading}>
                  Accept
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}