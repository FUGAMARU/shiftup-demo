// Next.js
import type { NextPage } from "next"
import Head from "next/head"

// Chakra UI Components
import { Box, Heading, Text, VStack, StackDivider, Checkbox } from "@chakra-ui/react"

// Custom Components
import Header from "../components/Header"
import RibbonHeading from "../components/RibbonHeading"
import AnimatedButton from "../components/AnimatedButton"

// Functions
import { resp } from "../functions"

const AnswerSurvey: NextPage = () => {
  return (
    <>
      <Head>
        <title>希望日程アンケート回答 | ShiftUP!</title>
      </Head>

      <Box h="100vh" bg="#e9ebee">
        <Header />
        <Box maxW={resp("95%", "90%", 900)} m="0 auto" bg="white" px={resp(6, 10, 14)} pt={8} pb={10} boxShadow="2xl" borderBottomRadius={15}>
          <RibbonHeading text="アンケート回答" />

          <Heading className="kb" mt={5} size="lg" textAlign="center">8月 シフトアンケート</Heading>
          <Box className="bubble-heading" w={resp(250, 300, 350)}></Box>
          <Text className="kr" textAlign="center" fontSize={resp(12, 12, 13)}>出勤可能な日にちにチェックを入れてください</Text>

          <VStack maxW={resp(250, 300, 300)} mt={5} mx="auto" divider={<StackDivider borderColor="gray.200" />} spacing={3} align="stretch">
            <Checkbox className="kr" justifyContent="center" colorScheme="cyan">2022/08/14 (日)</Checkbox>
            <Checkbox className="kr" justifyContent="center" colorScheme="cyan">2022/08/21 (日)</Checkbox>
            <Checkbox className="kr" justifyContent="center" colorScheme="cyan">2022/08/28 (日)</Checkbox>
          </VStack>

          <Box mt={7} textAlign="center">
            <AnimatedButton text="アンケート送信"></AnimatedButton>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default AnswerSurvey