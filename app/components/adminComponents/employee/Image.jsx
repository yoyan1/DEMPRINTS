import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

export default function ViewImage({imageUrl}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} >
        <img src={imageUrl}/>
      </Button>
      <Modal isOpen={isOpen} size="2xl" onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalBody>
                <img src={imageUrl}/>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}