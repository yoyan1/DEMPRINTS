"use client";

import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import AddLeave from "../component/addLeave";

export default function LeavePage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen}>Click</Button>

      <Modal size='sm' isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">Leave Entitlement</ModalHeader>
            <ModalBody>
                <AddLeave/>
            </ModalBody>
            {/* <ModalFooter>

            </ModalFooter> */}
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
