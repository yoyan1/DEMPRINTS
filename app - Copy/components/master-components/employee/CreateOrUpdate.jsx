"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { FaPlus } from "react-icons/fa6";
import JobDetails from '../form/JobDetails'

export default function CreateUser({done}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <div className="p-md">
        <Button color="primary" onPress={onOpen}>
        <FaPlus /> employee
        </Button>
        <Modal
          size="2xl"
          isOpen={isOpen}
          onClose={onClose}
          scrollBehavior="outside"
        >
          <ModalContent>
            {() => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  User Registration
                </ModalHeader>
                <ModalBody>
                    <JobDetails fetch={fetchJobData}/>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
}
