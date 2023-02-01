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

// Classes
import Symbol from "classes/Symbol"

// Types
import { Department } from "types/Department"

// Functions
import { isBlank } from "ts/functions"

// Global State Management
import { useRecoilState } from "recoil"
import { me } from "atoms/MeAtom"

interface Props {
  isOpen: boolean,
  onClose: VoidFunction
}

const ProfileEditModal = ({ isOpen, onClose }: Props) => {
  const responsiveType = useResponsive() // SmartPhone, Tablet, PC
  const { showToast } = useStyledToast()
  const { updateProfile } = useApiConnection()
  const [myInfo, setMyInfo] = useRecoilState(me)

  useEffect(() => {
    setNameInput(myInfo.name)
    setDept(myInfo.department)
  }, [myInfo])

  // 氏名入力欄
  const [nameInput, setNameInput] = useState("")
  const { isOpen: isNameInputPopoverOpened, onOpen: openNameInputPopover, onClose: closeNameInputPopover } = useDisclosure()

  // 学科・学部選択欄
  const [selectedDept, setDept] = useState<Department | "">("")
  const { isOpen: isDeptSelectorPopoverOpened, onOpen: openDeptSelectorPopover, onClose: closeDeptSelectorPopover } = useDisclosure()

  const checkValidation = useCallback(() => {
    let valid = true

    if (isBlank(nameInput)) {
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
      setMyInfo({
        name: nameInput,
        department: selectedDept as Department,
        position: myInfo.position
      })
      showToast("成功", "プロフィールを更新しました", "success")
      onClose()
      setNameInput(myInfo.name)
    } catch (e) {
      if (e instanceof Error) showToast("エラー", e.message, "error")
    }
  }, [checkValidation, nameInput, selectedDept, myInfo, setMyInfo, showToast, onClose, updateProfile])

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
                  <Input className="ksb" placeholder={myInfo.name} bg="white" focusBorderColor="#48c3eb" errorBorderColor="red.200" isInvalid={isNameInputPopoverOpened} value={nameInput} onChange={e => setNameInput(e.target.value)} />
                </PopOver>
              </Box>
            </Box>

            <Box>
              <Text className="ksb" pl={2} pb={1}>学部・学科</Text>
              <Box textAlign="center">
                <PopOver isOpen={isDeptSelectorPopoverOpened} onClose={closeDeptSelectorPopover} errorMessage="学科・学部が選択されていません">
                  <Box>
                    <SymbolSelector filtering={Symbol.getSchoolType(myInfo.department)} value={selectedDept} dispatch={setDept} />
                  </Box>
                </PopOver>
              </Box>
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button mr={1} colorScheme="blue" onClick={handleConfirmButtonClick}>更新する</Button>
          <Button ml={1} colorScheme="gray" variant="outline" onClick={() => { onClose(); setNameInput(myInfo.name) }}>キャンセル</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default memo(ProfileEditModal)