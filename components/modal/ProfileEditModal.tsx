// React
import { memo, useState, useCallback, useEffect } from "react"

// Custom Hooks
import { useResponsive } from "hooks/useResponsive"
import { useApiConnection } from "hooks/useApiConnection"
import { useStyledToast } from "hooks/useStyledToast"

// Chakra UI Components
import { Box, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, useDisclosure, Button, VStack, StackDivider } from "@chakra-ui/react"

// Custom Components
import PopOver from "components/PopOver"
import SymbolSelector from "components/select/SymbolSelector"

// Types
import { Department } from "types/Department"

// Global State Management
import { useRecoilValue } from "recoil"
import { name } from "atoms/NameAtom"

interface Props {
  isOpen: boolean,
  onClose: VoidFunction
}

const ProfileEditModal = ({ isOpen, onClose }: Props) => {
  const responsiveType = useResponsive() // SmartPhone, Tablet, PC
  const { showToast } = useStyledToast()
  const { updateProfile } = useApiConnection()
  const myName = useRecoilValue(name)

  // 氏名入力欄
  const [nameInput, setNameInput] = useState("")
  useEffect(() => setNameInput(myName), [myName])
  const { isOpen: isNameInputPopoverOpened, onOpen: openNameInputPopover, onClose: closeNameInputPopover } = useDisclosure()

  // 学科・学部選択欄
  const [selectedDept, setDept] = useState<Department | "">("")
  const { isOpen: isDeptSelectorPopoverOpened, onOpen: openDeptSelectorPopover, onClose: closeDeptSelectorPopover } = useDisclosure()

  const checkValidation = useCallback(() => {
    let valid = true

    const blankCharacters = /^[ 　\r\n\t]*$/
    if (blankCharacters.test(nameInput)) {
      openNameInputPopover()
      valid = false
    }

    if (!!!selectedDept) {
      openDeptSelectorPopover()
      valid = false
    }

    return valid
  }, [nameInput, openNameInputPopover, selectedDept, openDeptSelectorPopover])

  const handleConfirmButtonClick = useCallback(async () => {
    if (!!!checkValidation()) return

    try {
      await updateProfile(nameInput, selectedDept as Department)
      showToast("成功", "プロフィールを更新しました", "success")
      onClose()
      setNameInput(myName)
    } catch (e) {
      if (e instanceof Error) showToast("エラー", e.message, "error")
    }
  }, [checkValidation, nameInput, selectedDept, myName, showToast, onClose, updateProfile])

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={responsiveType === "SmartPhone"}>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(5px)" />
      <ModalContent mx={responsiveType === "SmartPhone" ? 3 : 0}>
        <ModalHeader>プロフィール編集</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack w="90%" mx="auto" divider={<StackDivider borderColor="gray.200" />} spacing={2} align="stretch">
            <Box>
              <Text className="ksb" pl={2} pb={1}>氏名</Text>
              <Box textAlign="center" mb={2}>
                <PopOver isOpen={isNameInputPopoverOpened} onClose={closeNameInputPopover} errorMessage="氏名が正しく入力されていません">
                  <Input className="ksb" placeholder={myName} bg="white" focusBorderColor="#48c3eb" errorBorderColor="red.200" isInvalid={isNameInputPopoverOpened} value={nameInput} onChange={e => setNameInput(e.target.value)} />
                </PopOver>
              </Box>
            </Box>

            <Box>
              <Text className="ksb" pl={2} pb={1}>学部・学科</Text>
              <Box textAlign="center">
                <PopOver isOpen={isDeptSelectorPopoverOpened} onClose={closeDeptSelectorPopover} errorMessage="学科・学部が選択されていません">
                  <Box>
                    <SymbolSelector dispatch={setDept} />
                  </Box>
                </PopOver>
              </Box>
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button mr={1} colorScheme="blue" onClick={handleConfirmButtonClick}>更新する</Button>
          <Button ml={1} colorScheme="gray" variant="outline" onClick={() => { onClose(); setNameInput(myName) }}>キャンセル</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default memo(ProfileEditModal)