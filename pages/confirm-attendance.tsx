// Next.js
import type { NextPage } from "next"
import Head from "next/head"

// Custom Hooks
import useResponsive from "../hooks/useResponsive"

// Chakra UI Components
import { Box, Flex, Text, SimpleGrid } from "@chakra-ui/react"

// Custom Components
import Body from "../components/Body"
import ConfirmButton from "../components/button/ConfirmButton"
import CancelButton from "../components/button/CancelButton"

// Functions
import { resp } from "../functions"

// Filter
import { withSession } from "../hoc/withSession"

const ConfirmAttendance: NextPage = () => {
  const responsiveType = useResponsive() // SmartPhone, Tablet, PC

  return (
    <>
      <Head>
        <title>出勤確定処理 | ShiftUP!</title>
      </Head>

      <Body title="出勤確定処理" statusMessage="出勤確定待ちの日程が2件あります">
        <>
          <SimpleGrid w={resp("100%", "80%", "80%")} mx="auto" my={5} py={3} columns={{ sm: 1, md: 2, lg: 2 }} spacingX={5} justifyItems="center" alignItems="center" boxShadow="xl" borderRadius={15} borderTop="solid 3px #718eed">
            <Box textAlign={responsiveType === "SmartPhone" ? "center" : "right"}>
              <Text className="kr" maxW={resp("17rem", "13.5rem", "18rem")} fontSize={resp("0.75rem", "0.80rem", "0.85rem")} color="#5f5f5f">12月シフト募集</Text>
              <Text className="kb" fontSize="1.2rem">2022/12/11 (日)</Text>
            </Box>
            <Flex mr={2} mt={resp(2, 0, 0)}>
              <Box mr={3}><ConfirmButton text="出勤確定" /></Box>
              <Box ml={3}> <CancelButton text="出勤辞退" /></Box>
            </Flex>
          </SimpleGrid>

          <SimpleGrid w={resp("100%", "80%", "80%")} mx="auto" my={5} py={3} columns={{ sm: 1, md: 2, lg: 2 }} spacingX={5} justifyItems="center" alignItems="center" boxShadow="xl" borderRadius={15} borderTop="solid 3px #718eed">
            <Box textAlign={responsiveType === "SmartPhone" ? "center" : "right"}>
              <Text className="kr" maxW={resp("17rem", "13.5rem", "18rem")} fontSize={resp("0.75rem", "0.80rem", "0.85rem")} color="#5f5f5f">大学OC(プレ入試)スタッフ募集</Text>
              <Text className="kb" fontSize="1.2rem">2022/12/04 (日)</Text>
            </Box>
            <Flex mr={2} mt={resp(2, 0, 0)}>
              <Box mr={3}><ConfirmButton text="出勤確定" /></Box>
              <Box ml={3}> <CancelButton text="出勤辞退" /></Box>
            </Flex>
          </SimpleGrid>
        </>
      </Body>
    </>
  )
}

export default withSession(ConfirmAttendance)