// Next.js
import type { NextPage } from "next"
import Head from "next/head"

// React Hooks
import { ChangeEvent, useState } from "react"

// Chakra UI Components
import { Box, Flex, Text, VStack, StackDivider, Checkbox, Select } from "@chakra-ui/react"

// Custom Components
import Body from "../components/Body"
import BumpHeading from "../components/heading/BumpHeading"
import AnimatedButton from "../components/button/SendButton"

// Libraries
import { up } from "slide-element"

// Functions
import { resp } from "../functions"

// Filter
import { withSession } from "../hoc/withSession"

const AnswerSurvey: NextPage = () => {
  const [selectedSurvey, setSelectedSurvey] = useState("")
  const [contentVisibility, setContentVisibility] = useState(false)

  const handleSurveySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSurvey(e.target.value)
    up(document.getElementById("selector") as HTMLElement, { duration: 500, easing: "ease-in-out" })
    setContentVisibility(true)
  }

  return (
    <>
      <Head>
        <title>希望日程アンケート回答 | ShiftUP!</title>
      </Head>

      <Body title="アンケート回答" content={<>
        <Box id="selector">
          <Select w={resp(220, 270, 320)} mx="auto" mb={5} placeholder="回答するアンケートを選択" onChange={(e) => handleSurveySelect(e)}>
            <option value="11月 シフトアンケート">11月 シフトアンケート</option>
            <option value="11月授業見学会 シフト募集">11月授業見学会 シフト募集</option>
          </Select>
        </Box>

        <Box className={contentVisibility ? "animate__animated animate__fadeIn" : ""} display={contentVisibility ? "static" : "none"} style={{ animationDelay: ".2s" }}>
          <BumpHeading title={selectedSurvey} />
          <Text className="kr" textAlign="center" fontSize={13}>出勤可能な日にちにチェックを入れてください</Text>

          <VStack maxW={resp(250, 300, 300)} mt={5} mx="auto" divider={<StackDivider borderColor="gray.200" />} spacing={3} align="stretch">
            <Checkbox className="kr" justifyContent="center">2022/08/14 (日)</Checkbox>
            <Checkbox className="kr" justifyContent="center">2022/08/21 (日)</Checkbox>
            <Checkbox className="kr" justifyContent="center">2022/08/28 (日)</Checkbox>
          </VStack>

          <Flex mt={7} justifyContent="center">
            <AnimatedButton text="アンケート送信"></AnimatedButton>
          </Flex>
        </Box>
      </>}></Body>
    </>
  )
}

export default withSession(AnswerSurvey, false)