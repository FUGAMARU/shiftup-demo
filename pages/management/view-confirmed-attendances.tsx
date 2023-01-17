// Next.js
import { NextPage } from "next"
import Head from "next/head"

// Custom Hooks
import { useResponsive } from "hooks/useResponsive"

// Chakra UI Components
import { Box, Select, VStack, StackDivider, Flex, Text, Tooltip, Button, } from "@chakra-ui/react"

// Custom Components
import Body from "components/Body"

// Functions
import { resp } from "ts/functions"

// Filter
import { withSession } from "hoc/withSession"

const ViewConfirmedAttendances: NextPage = () => {
  const responsiveType = useResponsive() // SmartPhone, Tablet, PC

  return (
    <Box>
      <Head>
        <title>出勤確定リスト確認 | ShiftUP!</title>
      </Head>

      <Body title="出勤確定リスト確認" statusMessage="2人のユーザーが出勤確定 / 1人のユーザーが出勤辞退しました">
        <Box w={resp("100%", "80%", "80%")} mx="auto">
          {/* valueはstateで管理する */}
          <Select w={resp("90%", 270, 320)} mx="auto" placeholder="日程を選択…" value="">
            <optgroup label="アンケート1">
              <option value="2023-01-01">2023/01/01 (日)</option>
              <option value="2023-01-01">2023/01/02 (月)</option>
              <option value="2023-01-01">2023/01/03 (火)</option>
            </optgroup>

            <optgroup label="アンケート2">
              <option value="2023-01-01">2023/01/04 (水)</option>
              <option value="2023-01-01">2023/01/05 (木)</option>
              <option value="2023-01-01">2023/01/06 (金)</option>
            </optgroup>
          </Select>

          <VStack mt={5} divider={<StackDivider borderColor="gray.200" />} spacing={3} align="stretch">
            <Flex justifyContent="space-between" alignItems="center">
              <Flex alignItems="center" px={3}>
                <Text className="kb" mr={2} fontSize={resp("1rem", "1.2rem", "1.2rem")}>真壁政宗</Text>
                <Text className="kr" ml={2} mr={1} fontSize={resp("0.65rem", "0.70rem", "0.75rem")} color="#5f5f5f">応用生物学部</Text>
                {responsiveType === "PC" || responsiveType === "Tablet" ? <Text className="kr" ml={1} fontSize="0.75rem" color="#5f5f5f">C0B22100</Text> : null}
              </Flex>
              <Flex alignItems="center">
                <Tooltip label="出勤辞退状態に切り替える">
                  <Button mr={resp(3, 5, 5)} size="xs" colorScheme="whatsapp" variant="outline">出勤確定済み</Button>
                </Tooltip>
              </Flex>
            </Flex>

            <Flex justifyContent="space-between" alignItems="center">
              <Flex alignItems="center" px={3}>
                <Text className="kb" mr={2} fontSize={resp("1rem", "1.2rem", "1.2rem")}>藤ノ宮寧子</Text>
                <Text className="kr" ml={2} mr={1} fontSize={resp("0.65rem", "0.70rem", "0.75rem")} color="#5f5f5f">応用生物学部</Text>
                {responsiveType === "PC" || responsiveType === "Tablet" ? <Text className="kr" ml={1} fontSize="0.75rem" color="#5f5f5f">C0B22101</Text> : null}
              </Flex>
              <Flex alignItems="center">
                <Tooltip label="出勤辞退状態に切り替える">
                  <Button mr={resp(3, 5, 5)} size="xs" colorScheme="whatsapp" variant="outline">出勤確定済み</Button>
                </Tooltip>
              </Flex>
            </Flex>

            <Flex justifyContent="space-between" alignItems="center">
              <Flex alignItems="center" px={3}>
                <Text className="kb" mr={2} fontSize={resp("1rem", "1.2rem", "1.2rem")}>安達垣愛姫</Text>
                <Text className="kr" ml={2} mr={1} fontSize={resp("0.65rem", "0.70rem", "0.75rem")} color="#5f5f5f">応用生物学部</Text>
                {responsiveType === "PC" || responsiveType === "Tablet" ? <Text className="kr" ml={1} fontSize="0.75rem" color="#5f5f5f">C0B22102</Text> : null}
              </Flex>
              <Flex alignItems="center">
                <Tooltip label="出勤確定状態に切り替える">
                  <Button mr={resp(3, 5, 5)} size="xs" colorScheme="red" variant="outline">出勤辞退済み</Button>
                </Tooltip>
              </Flex>
            </Flex>
          </VStack>
        </Box>
      </Body>
    </Box>
  )
}

export default withSession(ViewConfirmedAttendances)