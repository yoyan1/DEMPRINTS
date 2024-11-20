"use client"
import React, {useState} from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Tabs, Tab } from "@nextui-org/react";
import JobDetails from '../form/JobDetails'

export default function ModalWrapper() {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [key, setKey] = useState('job')
  const handleOpen = () => {
    onOpen();
  }

  return (
    <>
      <div className="p-md">
        <Button color="primary" onPress={handleOpen}>View details</Button>
        <Modal 
            size="3xl"
            isOpen={isOpen} 
            onClose={onClose} 
            scrollBehavior="outside"
        >
            <ModalContent>
            {() => (
                <>
                <ModalHeader className="flex flex-col gap-1">Employee Master Data</ModalHeader>
                <ModalBody>
                    <div>
                    <Tabs
                          fullWidth
                          size="sm"
                          color="primary"
                          aria-label="Tabs colors"
                          radius="full"
                          selectedKey={key}
                          onSelectionChange={setKey}
                        >
                          <Tab key="job" title="Job Details">
                            <JobDetails/>
                          </Tab>
                          <Tab key="relationship" title="Relationship">
                            <h1>Relationship</h1>
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
