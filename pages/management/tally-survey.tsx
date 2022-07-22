// Next.js
import type { NextPage } from "next"
import Head from "next/head"

// React Hooks
import { useState, useRef, useEffect } from "react"

// Custom Hooks
import { useGetElementProperty } from "../../hooks/useGetElementProperty"

// Chakra UI Components
import { Box, Heading, Flex, VStack, StackDivider, Text, Select, Checkbox } from "@chakra-ui/react"

// Custom Components
import AnimatedButton from "../../components/AnimatedButton"
import Body from "../../components/Body"

//Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserGroup, faCalendar, faCheck } from "@fortawesome/free-solid-svg-icons"

// Functions
import { resp } from "../../functions"

const TallySurvey: NextPage = () => {
  //高さの同期
  const [elementHight, setElementHight] = useState({
    castList: 0,
    sendButton: 0
  })

  const [elementRef] = useState({
    castList: useRef(null),
    sendButton: useRef(null)
  })

  const { getElementProperty: castListProperty } = useGetElementProperty<HTMLDivElement>(elementRef.castList)
  const { getElementProperty: sendButtonProperty } = useGetElementProperty<HTMLDivElement>(elementRef.sendButton)

  useEffect(() => {
    setElementHight({
      castList: castListProperty("height"),
      sendButton: sendButtonProperty("height")
    })
  }, [elementRef.castList])

  return (
    <>
      <Head>
        <title>希望日程アンケート集計 | ShiftUP!</title>
      </Head>

      <Body title="アンケート集計" content={<>

        <Flex justifyContent="center">
          <Box className="tally-survey-grid">
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
            <Flex justifyContent="center">
              <Box className="secondary-color" h={10} borderLeft="dotted 4px"></Box>
            </Flex>
            <Box>{/* 消さない！ */}</Box>
            <Flex className="flex-center">
              <FontAwesomeIcon className="secondary-color" icon={faUserGroup} fontSize={25}></FontAwesomeIcon>
            </Flex>
            <Flex pl={resp(6, 12, 12)} alignItems="center">
              <Heading className="kb" size="lg">出勤依頼する学生を選択</Heading>
            </Flex>
            <Flex className="flex-center">
              <Box className="secondary-color" h={elementHight.castList} borderLeft="dotted 4px"></Box>
            </Flex>
            <Flex pl={resp(9, 16, 16)} alignItems="center" ref={elementRef.castList}>
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
            <Flex pl={resp(6, 12, 12)}>
              <Heading className="kb" size="lg">送信</Heading>
            </Flex>
            <Flex className="flex-center">
              <Box className="secondary-color" h={elementHight.sendButton} borderLeft="dotted 4px"></Box>
            </Flex>
            <Flex justifyContent="center" ref={elementRef.sendButton}>
              <Box mt="2rem">
                <AnimatedButton text="確定依頼を送信"></AnimatedButton>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </>
      }></Body>
    </>
  )
}

export default TallySurvey