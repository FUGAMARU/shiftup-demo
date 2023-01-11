// Custom Hooks
import { useResponsive } from "hooks/useResponsive"

// Chakra UI Components
import { Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"

interface Props {
  isOpen: boolean,
  onClose: VoidFunction,
  title: string,
  text: string,
  children: React.ReactNode
}

const BlurModal = (props: Props) => {
  const responsiveType = useResponsive() // SmartPhone, Tablet, PC

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered={responsiveType === "SmartPhone"}>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(5px)" />
      <ModalContent mx={responsiveType === "SmartPhone" ? 3 : 0}>
        <ModalHeader>{props.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pl={8}>
          <Text className="ksb">{props.text}</Text>
        </ModalBody>
        <ModalFooter>
          {props.children}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default BlurModal