// Next.js
import type { NextPage } from "next"
import Head from "next/head"

// Chakra UI Components
import { Flex, Text, VStack, StackDivider, Checkbox } from "@chakra-ui/react"

// Custom Components
import Body from "../components/Body"
import BumpHeading from "../components/heading/BumpHeading"
import AnimatedButton from "../components/button/SendButton"

// Functions
import { resp } from "../functions"

const AnswerSurvey: NextPage = () => {
  return (
    <>
      <Head>
        <title>希望日程アンケート回答 | ShiftUP!</title>
      </Head>

      <Body title="アンケート回答" content={<>
        <BumpHeading title="8月 シフトアンケート" />
        <Text className="kr" textAlign="center" fontSize={13}>出勤可能な日にちにチェックを入れてください</Text>

        <VStack maxW={resp(250, 300, 300)} mt={5} mx="auto" divider={<StackDivider borderColor="gray.200" />} spacing={3} align="stretch">
          <Checkbox className="kr" justifyContent="center">2022/08/14 (日)</Checkbox>
          <Checkbox className="kr" justifyContent="center">2022/08/21 (日)</Checkbox>
          <Checkbox className="kr" justifyContent="center">2022/08/28 (日)</Checkbox>
        </VStack>

        <Flex mt={7} justifyContent="center">
          <AnimatedButton text="アンケート送信"></AnimatedButton>
        </Flex>
      </>}></Body>
    </>
  )
}

export default AnswerSurvey