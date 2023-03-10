// Next.js
import { NextPage } from "next"
import Head from "next/head"

// React Hooks
import { useState, useCallback, useEffect, useMemo } from "react"

// Custom Hooks
import { useResponsive } from "hooks/useResponsive"
import { useStyledToast } from "hooks/useStyledToast"
import { useApiConnection } from "hooks/useApiConnection"

// Chakra UI Components
import { Box, VStack, StackDivider, Flex, Text, Tooltip, Button, useDisclosure } from "@chakra-ui/react"

// Custom Components
import Body from "components/view/Body"
import ScheduleSelector from "components/select/ScheduleSelector"
import ButtonModal from "components/modal/ButtonModal"

//Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

// Functions
import { resp, formatDateForDisplay } from "ts/functions"

// Types
import { RequestState } from "types/RequestState"

// Classes
import Symbol from "classes/Symbol"

// Interfaces
import { User } from "interfaces/User"

// Filter
import { withSession } from "hoc/withSession"

const ViewConfirmedAttendances: NextPage = () => {
  const responsiveType = useResponsive() // SmartPhone, Tablet, PC
  const { showToast } = useStyledToast()
  const { getConfirmedUsers, changeRequestState } = useApiConnection()
  const [selectedUser, setSelectedUser] = useState("")
  const [surveyIdAndSchedule, setSelectedSchedule] = useState("")
  const selectedSchedule = useMemo(() => surveyIdAndSchedule.split("|")[1], [surveyIdAndSchedule])
  const { isOpen: isModalOpened1, onOpen: openModal1, onClose: closeModal1 } = useDisclosure()
  const { isOpen: isModalOpened2, onOpen: openModal2, onClose: closeModal2 } = useDisclosure()

  const [acceptedUsers, setAcceptedUsers] = useState<User[] | undefined>()
  const [declinedUsers, setDeclinedUsers] = useState<User[] | undefined>()
  const mutate = useCallback(() => {
    (async () => {
      try {
        const { acceptedUsers, declinedUsers } = await getConfirmedUsers(selectedSchedule)
        setAcceptedUsers(acceptedUsers)
        setDeclinedUsers(declinedUsers)
      } catch (e) {
        if (e instanceof Error) showToast("?????????", e.message, "error")
      }
    })()
  }, [selectedSchedule, getConfirmedUsers, setAcceptedUsers, setDeclinedUsers, showToast])
  useEffect(() => mutate(), [mutate])

  useEffect(() => {
    if (!!!selectedSchedule) return

    if (acceptedUsers?.length === 0 && declinedUsers?.length === 0) {
      openModal2()
    }
  }, [selectedSchedule, acceptedUsers, declinedUsers, openModal2])

  const handleButtonClick = useCallback(async (userId: string, state: RequestState) => {
    try {
      await changeRequestState(selectedSchedule, userId, state)
      mutate()
      showToast("??????", "????????????????????????????????????????????????", "success")
    } catch (e) {
      if (e instanceof Error) showToast("?????????", e.message, "error")
    }
  }, [selectedSchedule, changeRequestState, mutate, showToast])

  return (
    <Box>
      <Head>
        <title>??????????????????????????? | ShiftUP!</title>
      </Head>

      <Body title="???????????????????????????" statusMessage={acceptedUsers && declinedUsers ? `${acceptedUsers.length}????????????????????????????????? / ${declinedUsers.length}?????????????????????????????????????????????` : ""}>
        <Box w={resp("100%", "80%", "80%")} mx="auto">
          <Box w={resp("90%", 270, 320)} mx="auto">
            <ScheduleSelector value={surveyIdAndSchedule} dispatch={setSelectedSchedule} requireCandidates={false} />
          </Box>

          <VStack id="list" mt={5} divider={<StackDivider borderColor="gray.200" />} spacing={3} align="stretch">
            {acceptedUsers?.map(user => {
              return (
                <Flex key={user.id} justifyContent="space-between" alignItems="center">
                  <Flex alignItems="center" px={3}>
                    <Text className="kb" mr={2} fontSize={resp("1rem", "1.2rem", "1.2rem")}>{user.name}</Text>
                    <Text className="kr" ml={2} mr={1} fontSize={resp("0.65rem", "0.70rem", "0.75rem")} color="#5f5f5f">{Symbol.toStringSymbol(user.department)}</Text>
                    {responsiveType === "PC" || responsiveType === "Tablet" ? <Text className="kr" ml={1} fontSize="0.75rem" color="#5f5f5f">{user.studentNumber}</Text> : null}
                  </Flex>
                  <Flex alignItems="center">
                    <Tooltip label="????????????????????????????????????">
                      <Button mr={resp(3, 5, 5)} size="xs" colorScheme="whatsapp" variant="outline" onClick={() => handleButtonClick(user.id, "Declined")}>??????????????????</Button>
                    </Tooltip>
                    <Tooltip label="?????????????????????????????????">
                      <FontAwesomeIcon icon={faXmark} fontSize="1.5rem" color="#159848" cursor="pointer" onClick={() => { openModal1(); setSelectedUser(user.id) }} />
                    </Tooltip>
                  </Flex>
                </Flex>
              )
            })}

            {declinedUsers?.map(user => {
              return (
                <Flex key={user.id} justifyContent="space-between" alignItems="center">
                  <Flex alignItems="center" px={3}>
                    <Text className="kb" mr={2} fontSize={resp("1rem", "1.2rem", "1.2rem")}>{user.name}</Text>
                    <Text className="kr" ml={2} mr={1} fontSize={resp("0.65rem", "0.70rem", "0.75rem")} color="#5f5f5f">{Symbol.toStringSymbol(user.department)}</Text>
                    {responsiveType === "PC" || responsiveType === "Tablet" ? <Text className="kr" ml={1} fontSize="0.75rem" color="#5f5f5f">{user.studentNumber}</Text> : null}
                  </Flex>
                  <Flex alignItems="center">
                    <Tooltip label="????????????????????????????????????">
                      <Button mr={resp(3, 5, 5)} size="xs" colorScheme="red" variant="outline" onClick={() => handleButtonClick(user.id, "Accepted")}>??????????????????</Button>
                    </Tooltip>
                    <Tooltip label="?????????????????????????????????">
                      <FontAwesomeIcon icon={faXmark} fontSize="1.5rem" color="#c43030" cursor="pointer" onClick={() => { openModal1(); setSelectedUser(user.id) }} />
                    </Tooltip>
                  </Flex>
                </Flex>
              )
            })}
          </VStack>
        </Box>
      </Body>

      <ButtonModal isOpen={isModalOpened1} onClose={closeModal1} title="??????" text="?????????????????????/???????????????????????????????????????????????????">
        <Button mr={1} colorScheme="red" onClick={() => { handleButtonClick(selectedUser, "Blank"); closeModal1() }}>????????????</Button>
        <Button ml={1} colorScheme="gray" variant="outline" onClick={closeModal1}>???????????????</Button>
      </ButtonModal>

      <ButtonModal isOpen={isModalOpened2} onClose={closeModal2} title="?????????" text={`${formatDateForDisplay(selectedSchedule)} ??????????????????/?????????????????????????????????1??????????????????`}>
        <Button ml={1} colorScheme="gray" variant="outline" onClick={() => { closeModal2(); setSelectedSchedule("") }}>?????????</Button>
      </ButtonModal>
    </Box>
  )
}

export default withSession(ViewConfirmedAttendances)