//Custom Hooks
import useResponsive from "../../hooks/useResponsive"

// Next.js Components
import Image from "next/image"
import Link from "next/link"

// Chakra UI Components
import { Flex, Text, Box, Drawer, SimpleGrid, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure } from "@chakra-ui/react"

// Custom Components
import MenuItem from "./MenuItem"

// Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronCircleRight, faCalendarPlus, faListCheck, faCalendarCheck, faThumbsUp } from "@fortawesome/free-solid-svg-icons"
// Functions
import { resp } from "../../functions"

const Header = () => {
  const responsiveType = useResponsive() // SmartPhone, Tablet, PC
  const { isOpen: isMenuOpened, onOpen, onClose } = useDisclosure()

  return (
    <>
      {/* Drawer */}
      <Drawer placement="left" isOpen={isMenuOpened} onClose={onClose}>
        <DrawerOverlay bg="transparent" />
        <DrawerContent borderRightRadius={20} bg="rgba(98, 168, 228, 0.2)" backdropFilter="blur(5px)">
          <DrawerCloseButton color="white" />
          <DrawerHeader>
            {/* ヘッダー */}
          </DrawerHeader>
          <DrawerBody pt={10}>
            <Box className="kb" borderBottom="solid 2px #615f5f">管理者メニュー</Box>
            <SimpleGrid columns={3} spacing={3} pt={3} justifyItems="center">
              <MenuItem href="/management/create-survey" icon={faCalendarPlus} title={<Text>希望日程<br />アンケート作成</Text>} onClose={onClose} />
              <MenuItem href="/management/tally-survey" icon={faListCheck} title={<Text>希望日程<br />アンケート集計</Text>} onClose={onClose} />
            </SimpleGrid>

            <Box className="kb" mt={8} borderBottom="solid 2px #615f5f">キャストメニュー</Box>
            <SimpleGrid columns={3} spacing={3} pt={3} justifyItems="center">
              <MenuItem href="/answer-survey" icon={faCalendarCheck} title={<Text>希望日程<br />アンケート回答</Text>} onClose={onClose} />
              <MenuItem href="/confirm-attendance" icon={faThumbsUp} title={<Text>出勤確定処理</Text>} onClose={onClose} />
            </SimpleGrid>
          </DrawerBody>
          <DrawerFooter>
            <Text fontSize={12}>© 2022 TrinityTrick team</Text>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Box position="relative" zIndex={5} bgGradient="linear(to-br, #48C3EB, #718EDD)" shadow="lg" px={resp(1, 5, 5)} py={1} color="white">
        <Flex maxW="1300px" m="0 auto" justifyContent="space-between" alignItems="center">

          {/* メニューボタン */}
          <Box w={resp(90, 150, 150)} h={50} p={1} pt={2} textAlign="center" cursor="pointer" borderRadius={15} bg={isMenuOpened ? "rgba(255, 255, 255, 0.2)" : ""} _hover={{ background: "rgba(255, 255, 255, 0.2)" }} transition=".2s ease-in" onClick={onOpen}>
            <FontAwesomeIcon className={isMenuOpened ? "rotate-icon" : ""} icon={faChevronCircleRight} fontSize="1.2rem" />
            <Text className="kr" fontSize={10} color="white">メニュー</Text>
          </Box>

          {/* ロゴ */}
          <Link href="/">
            <a>
              <Flex className="flex-center" w={resp(90, 150, 150)} h={50} textAlign="center">
                <Box position="relative" w="100%" style={{ height: 40 }}>
                  <Image src="/logo-white.svg" layout="fill" objectFit="contain" />
                </Box>
              </Flex>
            </a>
          </Link>

          {/* ユーザー名 */}
          <Flex className="flex-center" w={resp(90, 150, 150)} h={50} textAlign="center" cursor="pointer" borderRadius={15} _hover={{ background: "rgba(255, 255, 255, 0.2)" }} transition=".2s cubic-bezier(0.250, 0.250, 0.750, 0.750)">
            <Text className="ksb" display="inline" fontSize={resp(13, 15, 17)} color="white">夏目美緒</Text>
            {responsiveType === "PC" || responsiveType === "Tablet" ? <Text className="kr" display="inline" fontSize={resp(10, 10, 12)} ml={1} color="white">さん</Text> : null}
          </Flex>

        </Flex>
      </Box>
    </>
  )
}

export default Header