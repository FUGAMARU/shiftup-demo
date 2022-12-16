// Next.js
import { NextPage, InferGetStaticPropsType } from "next"
import Head from "next/head"

// React Hooks
import { useState, useRef, useEffect, useMemo } from "react"

// Chakra UI Components
import { Flex, Grid, Text, Box, Input, Select, Radio, RadioGroup, Stack, useDisclosure } from "@chakra-ui/react"

// Custom Components
import Body from "../../components/Body"
import SendButton from "../../components/button/SendButton"
import PopOver from "../../components/PopOver"

// Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faCheck, faScrewdriverWrench, faUser } from "@fortawesome/free-solid-svg-icons"
import axios, { isAxiosError } from "axios"

// Functions
import { resp, toHankaku, standBy } from "../../functions"

// Filter
import { withSession } from "../../hoc/withSession"

// Types
import { SendButtonState } from "../../types/SendButtonState"

// Importing Symbols
import * as fs from "fs"
import * as path from "path"
type Departments = { [department: string]: string }
type Symbols = { [college: string]: Departments }
type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const jsonPath = path.join(process.cwd(), "json", "symbols.json")
  const jsonText = fs.readFileSync(jsonPath, "utf-8")
  const symbols = JSON.parse(jsonText) as Symbols

  return {
    props: { symbols: symbols }
  }
}

const AddApprovedUser: NextPage<Props> = ({ symbols }) => {
  const patternNEEC = useMemo(() => /^G\d{3}[A-Z]\d{4}$/, [])
  const patternTUT = useMemo(() => /^[\dA-Z]{3}\d{5}$/, [])
  const [sendButtonState, setSendButtonState] = useState<SendButtonState>("text")

  // 学籍番号入力欄
  const [studentIdNumberInput, setStudentIdNumberInput] = useState("")
  const [isInputTUT, setInputTUT] = useState(false)
  const [studentIdNumberInputErrorMessage, setStudentIdNumberInputErrorMessage] = useState("")
  const { isOpen: isStudentIdNumberInputPopoverOpened, onOpen: openStudentIdNumberInputPopover, onClose: closeStudentIdNumberInputPopover } = useDisclosure()

  // 学部・学科プルダウンメニュー
  const departmentMenuRef = useRef<HTMLSelectElement>(null)
  const [croppedSymbols, setCroppedSymbols] = useState<Symbols | Departments>(symbols)
  const [isDisabledDepartmentMenu, setDisabledDepartmentMenu] = useState(true)
  const [departmentMenuErrorMessage, setDepartmentMenuErrorMessage] = useState("")
  const { isOpen: isDepartmentMenuPopoverOpened, onOpen: openDepartmentMenuPopover, onClose: closeDepartmentMenuPopover } = useDisclosure()

  // 役職選択ラジオボタン
  const [userAttribute, setUserAttribute] = useState("Cast")

  // 入力されている学籍番号によって選択できる学部・学科を切り替える
  useEffect(() => {
    setStudentIdNumberInput((current) => toHankaku(current).toUpperCase())
    if (patternNEEC.test(studentIdNumberInput)) {
      setInputTUT(false)
      setDisabledDepartmentMenu(false)

      const copiedSymbols = Object.assign({}, symbols)
      delete copiedSymbols["東京工科大学"]
      setCroppedSymbols(copiedSymbols)

      return
    }

    if (patternTUT.test(studentIdNumberInput)) {
      setInputTUT(true)
      setDisabledDepartmentMenu(false)

      const copiedSymbols = Object.assign({}, symbols)
      setCroppedSymbols(copiedSymbols["東京工科大学"])

      return
    }

    setInputTUT(false)
    setDisabledDepartmentMenu(true)
  }, [studentIdNumberInput, patternNEEC, patternTUT, symbols])

  const checkValidation = (): boolean => {
    if (!!!departmentMenuRef.current) return false

    let valid = true

    setStudentIdNumberInput((current) => toHankaku(current).toUpperCase())

    if (!!!(patternNEEC.test(studentIdNumberInput) || patternTUT.test(studentIdNumberInput))) {
      setStudentIdNumberInputErrorMessage("学籍番号が正しく入力されていません")
      openStudentIdNumberInputPopover()
      valid = false
    }

    if (!!!departmentMenuRef.current.value) {
      setDepartmentMenuErrorMessage("学部・学科が選択されていません")
      openDepartmentMenuPopover()
      valid = false
    }

    return valid
  }

  const handleSendButtonClick = async () => {
    if (!!!checkValidation() || !!!departmentMenuRef.current) return

    setSendButtonState("spinner")
    await standBy(1000)

    const requestBody = {
      studentNumber: studentIdNumberInput,
      department: departmentMenuRef.current.value,
      position: userAttribute
    }

    try {
      const res = await axios.post(process.env.NEXT_PUBLIC_INVITES_URL as string, requestBody)

      if (res.status === 201) {
        setSendButtonState("checkmark")
        setTimeout(() => {
          if (!!!departmentMenuRef.current) return
          setStudentIdNumberInput("")
          departmentMenuRef.current.value = ""
          setUserAttribute("Cast")
        }, 1000)
      }
    } catch (e) {
      setSendButtonState("error")

      if (isAxiosError(e) && e.response?.status === 405) {
        setStudentIdNumberInputErrorMessage("入力された学籍番号は既に認可ユーザーとして追加済みです")
        openStudentIdNumberInputPopover()
      }
    }
  }

  return (
    <>
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
                <Input className="ksb" w={resp(250, 350, 350)} placeholder="(入力例) G021C1234" bg="white" focusBorderColor="#48c3eb" isInvalid={isStudentIdNumberInputPopoverOpened} errorBorderColor="red.200" value={studentIdNumberInput} onChange={(e) => setStudentIdNumberInput(e.target.value)}></Input>
              </PopOver>
            </Flex>
            <Flex className="flex-center">
              <FontAwesomeIcon className="secondary-color" icon={faScrewdriverWrench} fontSize={25}></FontAwesomeIcon>
            </Flex>
            <Flex pl={resp(6, 12, 12)} alignItems="center">
              <Text className="kb" fontSize={resp("1.5rem", "1.8rem", "1.9rem")}>学部・学科を選択</Text>
            </Flex>
            <Flex className="flex-center">
              <Box className="secondary-color" h="80px" borderLeft="dotted 4px"></Box>
            </Flex>
            <Flex pl={resp(9, 16, 16)} py={5} alignItems="center">
              <PopOver isOpen={isDepartmentMenuPopoverOpened} onClose={closeDepartmentMenuPopover} errorMessage={departmentMenuErrorMessage}>
                <Select w={resp(245, 350, 350)} placeholder={`${isInputTUT ? "学部" : "学科"}を選択`} ref={departmentMenuRef} focusBorderColor="#48c3eb" isInvalid={isDepartmentMenuPopoverOpened} isDisabled={isDisabledDepartmentMenu} errorBorderColor="red.200">
                  {isInputTUT ? Object.keys(croppedSymbols).map((key, idx) => {
                    return (
                      <option value={key} key={idx}>{Object.values(croppedSymbols[key])}</option>
                    )
                  }) : Object.keys(croppedSymbols).map((label, idx) => {
                    return (
                      <optgroup label={label} key={idx}>
                        {Object.keys(croppedSymbols[label]).map((subKey, subIdx) => {
                          return (
                            <option value={subKey} key={idx + subIdx}>{Object.values(croppedSymbols[label])[subIdx]}</option>
                          )
                        })}
                      </optgroup>
                    )
                  })}
                </Select>
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
              <RadioGroup onChange={setUserAttribute} value={userAttribute}>
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
    </>
  )
}

export default withSession(AddApprovedUser)