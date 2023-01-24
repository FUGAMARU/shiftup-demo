// Next.js
import { NextPage } from "next"
import Head from "next/head"

// React Hooks
import { useState, useEffect, useMemo, useCallback } from "react"

// Custom Hooks
import { useApiConnection } from "hooks/useApiConnection"

// Chakra UI Components
import { Flex, Grid, Text, Box, Input, Radio, RadioGroup, Stack, useDisclosure } from "@chakra-ui/react"

// Custom Components
import Body from "components/Body"
import SendButton from "components/button/SendButton"
import PopOver from "components/PopOver"
import SymbolSelector from "components/select/SymbolSelector"

// Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faCheck, faScrewdriverWrench, faUser } from "@fortawesome/free-solid-svg-icons"

// Functions
import { resp, toHankaku, standBy, getSchoolType } from "ts/functions"

// Filter
import { withSession } from "hoc/withSession"

// Types
import { SendButtonState } from "types/SendButtonState"
import { Position } from "types/Position"
import { Department } from "types/Department"

// Error Classes
import AlreadyAddedError from "classes/AlreadyAddedError"

const AddApprovedUser: NextPage = () => {
  // 学籍番号入力欄
  const [studentIdNumberInput, setStudentIdNumberInput] = useState("")
  const [studentIdNumberInputErrorMessage, setStudentIdNumberInputErrorMessage] = useState("")
  const { isOpen: isStudentIdNumberInputPopoverOpened, onOpen: openStudentIdNumberInputPopover, onClose: closeStudentIdNumberInputPopover } = useDisclosure()

  // 学科・学部プルダウンメニュー
  const [selectedDept, setDept] = useState<Department | "">("")
  const [departmentMenuErrorMessage, setDepartmentMenuErrorMessage] = useState("")
  const { isOpen: isDepartmentMenuPopoverOpened, onOpen: openDepartmentMenuPopover, onClose: closeDepartmentMenuPopover } = useDisclosure()

  // 役職選択ラジオボタン
  const [userAttribute, setUserAttribute] = useState<Position>("Cast")

  const [sendButtonState, setSendButtonState] = useState<SendButtonState>("text")
  const inputType = useMemo(() => getSchoolType(studentIdNumberInput), [studentIdNumberInput])

  const { addApprovedUser } = useApiConnection()

  // 入力されている学籍番号によって選択できる学科・学部を切り替える
  useEffect(() => setStudentIdNumberInput(current => toHankaku(current).toUpperCase()), [studentIdNumberInput])

  const checkValidation = useCallback(() => {
    let valid = true

    setStudentIdNumberInput((current) => toHankaku(current).toUpperCase())

    if (!!!inputType) {
      setStudentIdNumberInputErrorMessage("学籍番号が正しく入力されていません")
      openStudentIdNumberInputPopover()
      valid = false
    }

    if (!!!selectedDept) {
      setDepartmentMenuErrorMessage("学科・学部が選択されていません")
      openDepartmentMenuPopover()
      valid = false
    }

    return valid
  }, [openDepartmentMenuPopover, openStudentIdNumberInputPopover, inputType, selectedDept])

  const handleSendButtonClick = useCallback(async () => {
    if (!!!checkValidation()) return

    setSendButtonState("spinner")
    await standBy(1000)

    try {
      await addApprovedUser({
        studentNumber: studentIdNumberInput,
        department: selectedDept,
        position: userAttribute
      })

      setSendButtonState("checkmark")
      setTimeout(() => {
        setStudentIdNumberInput("")
        setDept("")
        setUserAttribute("Cast")
      }, 1000)

    } catch (e) {
      setSendButtonState("error")

      if (e instanceof AlreadyAddedError) {
        setStudentIdNumberInputErrorMessage(e.message)
        openStudentIdNumberInputPopover()
      }
    }
  }, [checkValidation, openStudentIdNumberInputPopover, studentIdNumberInput, userAttribute, addApprovedUser, selectedDept])

  return (
    <Box>
      <Head>
        <title>認可ユーザー追加 | ShiftUP!</title>
      </Head>

      <Body title="認可ユーザー追加">
        <Flex justifyContent="center">
          <Grid gridTemplateColumns="repeat(2, auto)" gridTemplateRows="repeat(8, auto)">
            <Flex className="flex-center">
              <FontAwesomeIcon className="secondary-color" icon={faPen} fontSize={25}></FontAwesomeIcon>
            </Flex>
            <Flex pl={resp(6, 12, 12)} alignItems="center">
              <Text className="kb" fontSize={resp("1.5rem", "1.8rem", "1.9rem")}>学籍番号を入力</Text>
            </Flex>
            <Flex className="flex-center">
              <Box className="secondary-color" h="80px" borderLeft="dotted 4px"></Box>
            </Flex>
            <Flex pl={resp(8, 16, 16)} py={5} alignItems="center">
              <PopOver isOpen={isStudentIdNumberInputPopoverOpened} onClose={closeStudentIdNumberInputPopover} errorMessage={studentIdNumberInputErrorMessage}>
                <Input className="ksb" w={resp(250, 350, 350)} placeholder="(入力例) G021C1234" bg="white" focusBorderColor="#48c3eb" isInvalid={isStudentIdNumberInputPopoverOpened} errorBorderColor="red.200" value={studentIdNumberInput} onChange={e => setStudentIdNumberInput(e.target.value)}></Input>
              </PopOver>
            </Flex>
            <Flex className="flex-center">
              <FontAwesomeIcon className="secondary-color" icon={faScrewdriverWrench} fontSize={25}></FontAwesomeIcon>
            </Flex>
            <Flex pl={resp(6, 12, 12)} alignItems="center">
              <Text className="kb" fontSize={resp("1.5rem", "1.8rem", "1.9rem")}>学科・学部を選択</Text>
            </Flex>
            <Flex className="flex-center">
              <Box className="secondary-color" h="80px" borderLeft="dotted 4px"></Box>
            </Flex>
            <Flex pl={resp(9, 16, 16)} py={5} alignItems="center">
              <PopOver isOpen={isDepartmentMenuPopoverOpened} onClose={closeDepartmentMenuPopover} errorMessage={departmentMenuErrorMessage}>
                <Box w={resp(245, 350, 350)} >
                  <SymbolSelector filtering={inputType} isInvalid={isDepartmentMenuPopoverOpened} isDisabled={!!!inputType} dispatch={setDept}></SymbolSelector>
                </Box>
              </PopOver>
            </Flex>
            <Flex className="flex-center">
              <FontAwesomeIcon className="secondary-color" icon={faUser} fontSize={25}></FontAwesomeIcon>
            </Flex>
            <Flex pl={resp(6, 12, 12)} alignItems="center">
              <Text className="kb" fontSize={resp("1.5rem", "1.8rem", "1.9rem")}>ユーザー属性を選択</Text>
            </Flex>
            <Flex className="flex-center">
              <Box className="secondary-color" h="64px" borderLeft="dotted 4px"></Box>
            </Flex>
            <Flex pl={resp("2.5rem", "4.2rem", "4.3rem")} py={5} alignItems="center">
              <RadioGroup onChange={e => setUserAttribute(e as Position)} value={userAttribute}>
                <Stack direction="row">
                  <Radio className="kr" value="Cast">キャスト</Radio>
                  <Radio className="kr" value="Manager">運営チーム</Radio>
                </Stack>
              </RadioGroup>
            </Flex>
            <Flex className="flex-center">
              <FontAwesomeIcon className="secondary-color" icon={faCheck} fontSize={25}></FontAwesomeIcon>
            </Flex>
            <Flex pl={resp(6, 12, 12)} alignItems="center">
              <Text className="kb" fontSize={resp("1.5rem", "1.8rem", "1.9rem")}>追加</Text>
            </Flex>
            <Flex className="flex-center">
              <Box className="secondary-color" h="74px" borderLeft="dotted 4px"></Box>
            </Flex>
            <Flex className="flex-center" pt="2rem">
              <SendButton text="ユーザーを追加" state={sendButtonState} onClick={handleSendButtonClick}></SendButton>
            </Flex>
          </Grid>
        </Flex >
      </Body>
    </Box>
  )
}

export default withSession(AddApprovedUser)