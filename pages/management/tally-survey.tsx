// Next.js
import type { NextPage } from "next"
import Head from "next/head"

// React Hooks
import { useState, useRef, useEffect } from "react"

// Custom Hooks
import { useGetElementProperty } from "../../hooks/useGetElementProperty"

// Chakra UI Components
import { Box, Flex, VStack, StackDivider, Text, Select, Checkbox, Grid } from "@chakra-ui/react"

// Custom Components
import AnimatedButton from "../../components/button/SendButton"
import Body from "../../components/Body"

//Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserGroup, faCalendar, faCheck, faListCheck } from "@fortawesome/free-solid-svg-icons"

// Functions
import { resp } from "../../functions"

// Filter
import { withSession } from "../../hoc/withSession"

const TallySurvey: NextPage = () => {
  // 学生(キャスト)リストとドットの高さの同期
  const castListRef = useRef(null)
  const [castListHeight, setCastListHeight] = useState(0)
  const { getElementProperty: castListProperty } = useGetElementProperty<HTMLDivElement>(castListRef)
  useEffect(() => setCastListHeight(castListProperty("height")), [castListRef, castListProperty])

  return (
    <>
      <Head>
        <title>希望日程アンケート集計 | ShiftUP!</title>
      </Head>

      <Body title="アンケート集計">
        <Flex justifyContent="center">
          <Grid gridTemplateColumns="repeat(2, auto)" gridTemplateRows="repeat(6, auto)">
            <Flex className="flex-center">
              <FontAwesomeIcon className="secondary-color" icon={faListCheck} fontSize={25}></FontAwesomeIcon>
            </Flex>
            <Flex pl={resp(6, 12, 12)} alignItems="center">
              <Select w={resp(250, 300, 350)} placeholder="集計するアンケートを選択">
                <option value="11月 シフトアンケート">11月 シフトアンケート</option>
                <option value="11月授業見学会 シフト募集">11月授業見学会 シフト募集</option>
              </Select>
            </Flex>
            <Flex className="flex-center">
              <Box className="secondary-color" h={10} borderLeft="dotted 4px"></Box>
            </Flex>
            <Box>{/* 消さない！ */}</Box>
            <Flex className="flex-center">
              <FontAwesomeIcon className="secondary-color" icon={faCalendar} fontSize={25}></FontAwesomeIcon>
            </Flex>
            <Flex pl={resp(6, 12, 12)} alignItems="center">
              <Select w={resp(250, 300, 350)} placeholder="集計する日にちを選択">
                <option value="20220814">2022/08/14 (日)</option>
                <option value="20220821">2022/08/21 (日)</option>
                <option value="20220828">2022/08/28 (日)</option>
              </Select>
            </Flex>
            <Flex className="flex-center">
              <Box className="secondary-color" h={10} borderLeft="dotted 4px"></Box>
            </Flex>
            <Box>{/* 消さない！ */}</Box>
            <Flex className="flex-center">
              <FontAwesomeIcon className="secondary-color" icon={faUserGroup} fontSize={25}></FontAwesomeIcon>
            </Flex>
            <Flex pl={resp(6, 12, 12)} alignItems="center">
              <Text className="kb" fontSize={resp("1.45rem", "1.8rem", "1.9rem")}>出勤依頼する学生を選択</Text>
            </Flex>
            <Flex className="flex-center">
              <Box className="secondary-color" h={castListHeight} borderLeft="dotted 4px"></Box>
            </Flex>
            <Flex pl={resp(9, 16, 16)} alignItems="center" ref={castListRef}>
              <VStack py={5} divider={<StackDivider borderColor="gray.200" />} spacing={3} align="stretch">
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
            <Flex className="flex-center">
              <FontAwesomeIcon className="secondary-color" icon={faCheck} fontSize={25}></FontAwesomeIcon>
            </Flex>
            <Flex pl={resp(6, 12, 12)} alignItems="center">
              <Text className="kb" fontSize={resp("1.5rem", "1.8rem", "1.9rem")}>送信</Text>
            </Flex>
            <Flex className="flex-center">
              <Box className="secondary-color" h="74px" borderLeft="dotted 4px"></Box>
            </Flex>
            <Flex className="flex-center" pt="2rem">
              <AnimatedButton text="確定依頼を送信" state="text"></AnimatedButton>
            </Flex>
          </Grid>
        </Flex>
      </Body>
    </>
  )
}

export default withSession(TallySurvey)