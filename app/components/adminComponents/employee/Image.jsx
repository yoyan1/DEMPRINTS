import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

export default function ViewImage({imageUrl, image}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <div onClick={onOpen} className="cursor-pointer">
        {image}
      </div>
      <Modal isOpen={isOpen} size="2xl" onOpenChange={onOpenChange} scrollBehavior="outside">
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