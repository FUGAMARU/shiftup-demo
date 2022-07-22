// Next.js
import type { NextPage } from "next"
import Head from "next/head"

// Chakra UI Components
import { Box, Heading, Flex, VStack, StackDivider, Text, Select, Checkbox } from "@chakra-ui/react"

// Custom Components
import Header from "../../components/Header"
import RibbonHeading from "../../components/RibbonHeading"
import AnimatedButton from "../../components/AnimatedButton"

//Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserGroup, faCalendar, faCheck } from "@fortawesome/free-solid-svg-icons"

// Functions
import { resp } from "../../functions"

const TallySurvey: NextPage = () => {
  return (
    <>
      <Head>
        <title>希望日程アンケート集計 | ShiftUP!</title>
      </Head>

      <Box h="100vh" bg="#e9ebee">
        <Header />
        <Box position="relative" maxW={resp("95%", "90%", 900)} m="0 auto" bg="white" px={resp(6, 10, 14)} pt={8} pb={10} boxShadow="2xl" borderBottomRadius={15}>
          <RibbonHeading text="アンケート集計" />

          <Flex mt={5} mb={1} alignItems="center" position="relative" left={resp("0rem", "7.5rem", "10rem")}>
            <FontAwesomeIcon className="secondary-color" icon={faCalendar} fontSize={25}></FontAwesomeIcon>
            <Select w={resp(250, 300, 350)} ml={resp(5, 12, 12)} placeholder="集計する日にちを選択">
              <option value="20220814">2022/08/14 (日)</option>
              <option value="20220821">2022/08/21 (日)</option>
              <option value="20220828">2022/08/28 (日)</option>
            </Select>
          </Flex>

          <Box className="secondary-color" h={10} position="relative" left={resp("0.5rem", "8rem", "10.5rem")} borderLeft="dotted 4px"></Box>

          <Flex position="relative" alignItems="center" left={resp("0rem", "7.5rem", "10rem")}>
            <FontAwesomeIcon className="secondary-color" style={{ marginLeft: "-0.3rem" }} icon={faUserGroup} fontSize={25}></FontAwesomeIcon>
            <Heading className="kb" ml={resp("1rem", "3.2rem", "3.2rem")} size="lg">出勤依頼する学生を選択</Heading>
          </Flex>

          <Flex position="relative" alignItems="stretch" left={resp("0.5rem", "8rem", "10.5rem")}>
            <Box className="secondary-color" borderLeft="dotted 4px"></Box>
            <VStack ml={resp(12, 20, 20)} py={5} divider={<StackDivider borderColor="gray.200" />} spacing={3} align="stretch">
              <Checkbox>
                <Flex alignItems="center">
                  <Text className="kr">可児江西也</Text>
                  <Text pl={2} fontSize={10} color="#898989">応用生物学部 4年</Text>
                </Flex>
              </Checkbox>
              <Checkbox>
                <Flex alignItems="center">
                  <Text className="kr">千斗いすず</Text>
                  <Text pl={2} fontSize={10} color="#898989">応用生物学部 4年</Text>
                </Flex>
              </Checkbox>
              <Checkbox>
                <Flex alignItems="center">
                  <Text className="kr">長名なじみ</Text>
                  <Text pl={2} fontSize={10} color="#898989">声優・演劇科 2年</Text>
                </Flex>
              </Checkbox>
              <Checkbox>
                <Flex alignItems="center">
                  <Text className="kr">古見硝子</Text>
                  <Text pl={2} fontSize={10} color="#898989">ダンスパフォーマンス科 2年</Text>
                </Flex>
              </Checkbox>
              <Checkbox>
                <Flex alignItems="center">
                  <Text className="kr">只野仁人</Text>
                  <Text pl={2} fontSize={10} color="#898989">CG・映像科 2年</Text>
                </Flex>
              </Checkbox>
            </VStack>
          </Flex>

          <Flex position="relative" alignItems="center" left={resp("0rem", "7.5rem", "10rem")}>
            <FontAwesomeIcon className="secondary-color" icon={faCheck} fontSize={25}></FontAwesomeIcon>
            <Heading ml={resp(5, 14, 14)} className="kb" size="lg">集計</Heading>
          </Flex>

          <Flex position="relative" alignItems="center" left={resp("0.5rem", "8rem", "10.5rem")}>
            <Box className="secondary-color" h="2.75rem" borderLeft="dotted 4px"></Box>
            <Flex ml="0.15rem" mb="-2.5rem" alignItems="center">
              <Box className="secondary-color" w={10} mr={5} borderTop="dotted 4px"></Box>
              <AnimatedButton text="確定依頼を送信"></AnimatedButton>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </>
  )
}

export default TallySurvey