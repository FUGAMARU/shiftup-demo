// Next.js
import type { NextPage } from "next"
import Head from "next/head"

// Chakra UI Components
import { Box, Heading, Text, VStack, StackDivider, Checkbox } from "@chakra-ui/react"

// Custom Components
import AnimatedButton from "../components/AnimatedButton"
import Body from "../components/Body"

// Functions
import { resp } from "../functions"

const AnswerSurvey: NextPage = () => {
  return (
    <>
      <Head>
        <title>希望日程アンケート回答 | ShiftUP!</title>
      </Head>

      <Body title="アンケート回答" content={<>
        <Heading className="kb" size="lg" textAlign="center">8月 シフトアンケート</Heading>
        <Box className="bubble-heading" w={resp(250, 300, 350)}></Box>
        <Text className="kr" textAlign="center" fontSize={resp(12, 12, 13)}>出勤可能な日にちにチェックを入れてください</Text>

        <VStack maxW={resp(250, 300, 300)} mt={5} mx="auto" divider={<StackDivider borderColor="gray.200" />} spacing={3} align="stretch">
          <Checkbox className="kr" justifyContent="center">2022/08/14 (日)</Checkbox>
          <Checkbox className="kr" justifyContent="center">2022/08/21 (日)</Checkbox>
          <Checkbox className="kr" justifyContent="center">2022/08/28 (日)</Checkbox>
        </VStack>

        <Box mt={7} textAlign="center">
          <AnimatedButton text="アンケート送信"></AnimatedButton>
        </Box>
      </>}></Body>
    </>
  )
}

export default AnswerSurvey