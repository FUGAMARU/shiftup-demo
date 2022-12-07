// Next.js
import type { NextPage } from "next"
import Head from "next/head"

// Custom Hooks
import useResponsive from "../hooks/useResponsive"

// Chakra UI Components
import { Box, Flex, Text, SimpleGrid, StackDivider, VStack, Button } from "@chakra-ui/react"

// Custom Components
import Body from "../components/Body"

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

      <Body title="出勤確定処理" statusMessage="出勤確定待ちの日程が3件あります">
        <Box w={resp("100%", "80%", "80%")} mx="auto">
          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={3}
            align="stretch"
          >
            <SimpleGrid columns={{ sm: 1, md: 3, lg: 3 }} gridTemplateColumns={{ sm: "", md: "3.5fr 3.5fr 3fr", lg: "2.5fr 4.5fr 3fr" }} alignItems="center">
              <Text className="kb" mx={resp("auto", 0, 0)} fontSize={resp("1rem", "1.2rem", "1.2rem")} textAlign="right">2022/12/11 (日)</Text>
              <Text className="kr" mx={resp("auto", 0, 0)} px={resp("auto", 3, 3)} fontSize={resp("0.65rem", "0.70rem", "0.75rem")} textAlign={responsiveType === "SmartPhone" ? "center" : "left"} color="#5f5f5f">12月シフト募集</Text>
              <Flex w="100%" mt={resp("0.5rem", 0, 0)} justifyContent={responsiveType === "SmartPhone" ? "center" : "end"} alignItems="center">
                <Button mr={resp(2, 3, 3)} size="sm" colorScheme="whatsapp" variant="outline">確定する</Button>
                <Button ml={resp(2, 3, 3)} size="sm" colorScheme="red" variant="outline">辞退する</Button>
              </Flex>
            </SimpleGrid>

            <SimpleGrid columns={{ sm: 1, md: 3, lg: 3 }} gridTemplateColumns={{ sm: "", md: "3.5fr 3.5fr 3fr", lg: "2.5fr 4.5fr 3fr" }} alignItems="center">
              <Text className="kb" mx={resp("auto", 0, 0)} fontSize={resp("1rem", "1.2rem", "1.2rem")} textAlign="right">2022/12/04 (日)</Text>
              <Text className="kr" mx={resp("auto", 0, 0)} px={resp("auto", 3, 3)} fontSize={resp("0.65rem", "0.70rem", "0.75rem")} textAlign={responsiveType === "SmartPhone" ? "center" : "left"} color="#5f5f5f">大学OC(プレ入試)スタッフ募集</Text>
              <Flex w="100%" mt={resp("0.5rem", 0, 0)} justifyContent={responsiveType === "SmartPhone" ? "center" : "end"} alignItems="center">
                <Button mr={resp(2, 3, 3)} size="sm" colorScheme="whatsapp" variant="outline">確定する</Button>
                <Button ml={resp(2, 3, 3)} size="sm" colorScheme="red" variant="outline">辞退する</Button>
              </Flex>
            </SimpleGrid>

            <SimpleGrid columns={{ sm: 1, md: 3, lg: 3 }} gridTemplateColumns={{ sm: "", md: "3.5fr 3.5fr 3fr", lg: "2.5fr 4.5fr 3fr" }} alignItems="center">
              <Text className="kb" mx={resp("auto", 0, 0)} fontSize={resp("1rem", "1.2rem", "1.2rem")} textAlign="right">2022/12/31 (土)</Text>
              <Text className="kr" mx={resp("auto", 0, 0)} px={resp("auto", 3, 3)} fontSize={resp("0.65rem", "0.70rem", "0.75rem")} textAlign={responsiveType === "SmartPhone" ? "center" : "left"} color="#5f5f5f">妙に文字数が多くて今にも見切れそうなアンケートタイトル</Text>
              <Flex w="100%" mt={resp("0.5rem", 0, 0)} justifyContent={responsiveType === "SmartPhone" ? "center" : "end"} alignItems="center">
                <Button mr={resp(2, 3, 3)} size="sm" colorScheme="whatsapp" variant="outline">確定する</Button>
                <Button ml={resp(2, 3, 3)} size="sm" colorScheme="red" variant="outline">辞退する</Button>
              </Flex>
            </SimpleGrid>
          </VStack>
        </Box>
      </Body>
    </>
  )
}

export default withSession(ConfirmAttendance)