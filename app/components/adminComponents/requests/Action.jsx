"use client"
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

export default function Action() {
  const {isOpen, onOpen, onClose} = useDisclosure();

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
                <Button color="danger" variant="light">
                  Decline
                </Button>
                <Button color="success">
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