// Next.js
import { NextPage, InferGetStaticPropsType } from "next"
import Head from "next/head"

// React Hooks
import { useState, useRef } from "react"

// Chakra UI Components
import { Flex, Grid, Text, Box, Input, Select, Radio, RadioGroup, Stack, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody } from "@chakra-ui/react"

// Custom Components
import Body from "../../components/Body"
import SendButton from "../../components/button/SendButton"

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
type Symbols = { [key: string]: string }
type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const jsonPath = path.join(process.cwd(), "public", "symbols.json")
  const jsonText = fs.readFileSync(jsonPath, "utf-8")
  const symbols = JSON.parse(jsonText) as Symbols

  return {
    props: { symbols: symbols }
  }
}

const AddApprovedUser: NextPage<Props> = ({ symbols }) => {
  const [sendButtonState, setSendButtonState] = useState<SendButtonState>("text")

  // 学籍番号入力欄
  const studentIdNumberRef = useRef<HTMLInputElement>(null)
  const [studentIdNumberPopover, setStudentIdNumberPopover] = useState({
    isOpen: false,
    message: ""
  })
  const closeStudentIdNumberPopover = () => {
    const prevMessage = studentIdNumberPopover.message
    setStudentIdNumberPopover({
      isOpen: false,
      message: prevMessage
    })
  }

  // 学部・学科プルダウンメニュー
  const departmentMenuRef = useRef<HTMLSelectElement>(null)
  const [departmentMenuPopover, setDepartmentMenuPopover] = useState({
    isOpen: false,
    message: ""
  })
  const closeDepartmentMenuPopover = () => {
    const prevMessage = departmentMenuPopover.message
    setDepartmentMenuPopover({
      isOpen: false,
      message: prevMessage
    })
  }

  // 役職選択ラジオボタン
  //const positionSelectorRef = useRef(null)
  const [userAttribute, setUserAttribute] = useState("Cast")

  const checkValidation = (): boolean => {
    if (!!!studentIdNumberRef.current || !!!departmentMenuRef.current) return false

    let valid = true

    studentIdNumberRef.current.value = toHankaku(studentIdNumberRef.current.value).toUpperCase()
    const pattern = /^([a-zA-Z0-9]{1,})$/

    if (!!!pattern.test(studentIdNumberRef.current.value)) {
      setStudentIdNumberPopover({
        isOpen: true,
        message: "学籍番号が正しく入力されていません"
      })
      valid = false
    }

    if (!!!departmentMenuRef.current.value) {
      setDepartmentMenuPopover({
        isOpen: true,
        message: "学部・学科が選択されていません"
      })
      valid = false
    }

    return valid
  }

  const handleSendButtonClick = async () => {
    if (!!!checkValidation() || !!!studentIdNumberRef.current || !!!departmentMenuRef.current) return

    setSendButtonState("spinner")

    await standBy(1000)

    const requestBody = {
      studentNumber: studentIdNumberRef.current.value,
      department: departmentMenuRef.current.value,
      position: userAttribute
    }

    try {
      const res = await axios.post(process.env.NEXT_PUBLIC_ADD_APPROVED_USER_URL as string, requestBody)

      if (res.status === 201) {
        setSendButtonState("checkmark")
        setTimeout(() => {
          if (!!!studentIdNumberRef.current || !!!departmentMenuRef.current) return
          studentIdNumberRef.current.value = ""
          departmentMenuRef.current.value = ""
          setUserAttribute("Cast")
        }, 1000)
      }
    } catch (e) {
      setSendButtonState("error")

      if (isAxiosError(e) && e.response?.status === 405) {
        setStudentIdNumberPopover({
          isOpen: true,
          message: "入力された学籍番号は既に認可ユーザーとして追加済みです"
        })
      }
    }
  }

  return (
    <>
      <Head>
        <title>認可ユーザー追加 | ShiftUP!</title>
      </Head>

      <Body title="認可ユーザー追加" content={
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
              <Popover isOpen={studentIdNumberPopover.isOpen}>
                <PopoverTrigger>
                  <Input className="ksb" w={resp(250, 350, 350)} placeholder="(入力例) G021C1234" ref={studentIdNumberRef} bg="white" focusBorderColor="#48c3eb" isInvalid={studentIdNumberPopover.isOpen} errorBorderColor="red.200" onClick={closeStudentIdNumberPopover}></Input>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow bg="red.100" />
                  <PopoverBody className="ksb" color="red.500" bg="red.100">{studentIdNumberPopover.message}</PopoverBody>
                </PopoverContent>
              </Popover>
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
              <Popover isOpen={departmentMenuPopover.isOpen}>
                <PopoverTrigger>
                  <Select w={resp(245, 350, 350)} placeholder="学科を選択" ref={departmentMenuRef} focusBorderColor="#48c3eb" isInvalid={departmentMenuPopover.isOpen} errorBorderColor="red.200" onClick={closeDepartmentMenuPopover}>
                    {Object.keys(symbols).map((label, idx) => {
                      return (
                        <optgroup label={label} key={idx}>
                          {Object.keys(symbols[label]).map((subKey, subIdx) => {
                            return (
                              <option value={subKey} key={idx + subIdx}>{Object.values(symbols[label])[subIdx]}</option>
                            )
                          })}
                        </optgroup>
                      )
                    })}
                  </Select>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow bg="red.100" />
                  <PopoverBody className="ksb" color="red.500" bg="red.100">{departmentMenuPopover.message}</PopoverBody>
                </PopoverContent>
              </Popover>
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
      } />
    </>
  )
}

export default withSession(AddApprovedUser)