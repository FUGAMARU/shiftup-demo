// Next.js
import type { NextPage } from "next"
import Head from "next/head"

// Chakra UI Components
import { Box, Flex, Text, SimpleGrid } from "@chakra-ui/react"

// Custom Components
import Body from "../components/Body"
import ConfirmButton from "../components/button/ConfirmButton"
import CancelButton from "../components/button/CancelButton"

// Functions
import { resp } from "../functions"

// Filter
import { AuthFilter } from "../hoc/AuthFilter"

const ConfirmAttendance: NextPage = () => {
  return (
    <>
      <Head>
        <title>出勤確定処理 | ShiftUP!</title>
      </Head>

      <Body title="出勤確定処理" content={<>
        <Text className="kr" fontSize={13} textAlign="center">出勤確定待ちの日程が2件あります</Text>
        <SimpleGrid w={resp("100%", "80%", "80%")} mx="auto" my={5} py={3} columns={{ sm: 1, md: 2, lg: 2 }} spacingX={5} justifyItems="center" alignItems="center" boxShadow="xl" borderRadius={15} borderTop="solid 3px #718eed">
          <Text className="kb" fontSize="1.2rem">2022/08/14 (日)</Text>
          <Flex mr={2} mt={resp(2, 0, 0)}>
            <Box mr={3}><ConfirmButton text="出勤確定" /></Box>
            <Box ml={3}> <CancelButton text="出勤辞退" /></Box>
          </Flex>
        </SimpleGrid>
        <SimpleGrid w={resp("100%", "80%", "80%")} mx="auto" my={5} py={3} columns={{ sm: 1, md: 2, lg: 2 }} spacingX={5} justifyItems="center" alignItems="center" boxShadow="xl" borderRadius={15} borderTop="solid 3px #718eed">
          <Text className="kb" fontSize="1.2rem">2022/08/21 (日)</Text>
          <Flex mr={2} mt={resp(2, 0, 0)}>
            <Box mr={3}><ConfirmButton text="出勤確定" /></Box>
            <Box ml={3}> <CancelButton text="出勤辞退" /></Box>
          </Flex>
        </SimpleGrid>
      </>}></Body>
    </>
  )
}

export default AuthFilter(ConfirmAttendance)