// React
import { memo } from "react"

// Next.js Components
import Image from "next/image"
import Link from "next/link"

//Custom Hooks
import { useResponsive } from "hooks/useResponsive"
import { useStatusCheck } from "hooks/useStatusCheck"

// Chakra UI Components
import { Flex, Text, Box, Drawer, SimpleGrid, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, Popover, PopoverTrigger, PopoverContent, PopoverBody, PopoverArrow } from "@chakra-ui/react"

// Custom Components
import MenuItem from "components/header/MenuItem"

// Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronCircleRight, faCalendarPlus, faListCheck, faCalendarCheck, faThumbsUp, faUserPlus, faArrowRightFromBracket, faScrewdriverWrench, faUsersGear, faSquarePollHorizontal, faClock } from "@fortawesome/free-solid-svg-icons"

// Global State Management
import { useRecoilValue } from "recoil"
import { sessionState } from "atoms/SessionStateAtom"
import { isManager } from "atoms/RoleAtom"

// Functions
import { resp } from "ts/functions"

const Header = () => {
  useStatusCheck() // ページ遷移の度に呼ばれてかつRecoilが使えるコンポーネント内でこのメソッドを呼ぶ

  const isInSession = useRecoilValue(sessionState)
  const amIManager = useRecoilValue(isManager)

  const responsiveType = useResponsive() // SmartPhone, Tablet, PC
  const { isOpen: isMenuOpened, onOpen: openMenu, onClose: closeMenu } = useDisclosure()
  const { isOpen: isUserMenuOpened, onOpen: openUserMenu, onClose: closeUserMenu } = useDisclosure()

  return (
    <Box>
      {/* Drawer */}
      <Drawer placement="left" isOpen={isMenuOpened} onClose={closeMenu}>
        <DrawerOverlay bg="transparent" />
        <DrawerContent borderRightRadius={20} bg="rgba(98, 168, 228, 0.2)" backdropFilter="blur(5px)">
          <DrawerCloseButton color="white" />
          <DrawerHeader>
            {/* メニューコンテンツ */}
          </DrawerHeader>
          <DrawerBody>
            <Link href="/">
              <a>
                <Box className="kb" mt={5} borderRadius={15} border="solid 2px #4a4848" textAlign="center" cursor="pointer" onClick={closeMenu}>トップページに戻る</Box>
              </a>
            </Link>
            {amIManager ?
              <Box pt={5} pb={5}>
                <Box className="kb" borderBottom="solid 2px #615f5f">管理者メニュー</Box>
                <SimpleGrid columns={3} spacing={3} pt={3} justifyItems="center">
                  <MenuItem href="/management/manage-surveys" icon={faSquarePollHorizontal} title={"希望日程\nアンケート管理"} onClose={closeMenu} />
                  <MenuItem href="/management/create-survey" icon={faCalendarPlus} title={"希望日程\nアンケート作成"} onClose={closeMenu} />
                  <MenuItem href="/management/tally-survey" icon={faListCheck} title={"希望日程\nアンケート集計"} onClose={closeMenu} />
                  <MenuItem href="/management/manage-users" icon={faUsersGear} title={"ユーザー管理"} onClose={closeMenu} />
                  <MenuItem href="/management/add-approved-user" icon={faUserPlus} title={"認可ユーザー\n追加"} onClose={closeMenu} />
                  <MenuItem href="/management/manage-schedule" icon={faClock} title={"スケジュール\n管理"} onClose={closeMenu} />
                </SimpleGrid>
              </Box>
              : null}

            <Box className="kb" pt={5} borderBottom="solid 2px #615f5f">キャストメニュー</Box>
            <SimpleGrid columns={3} spacing={3} pt={3} justifyItems="center">
              <MenuItem href="/answer-survey" icon={faCalendarCheck} title={"希望日程\nアンケート回答"} onClose={closeMenu} />
              <MenuItem href="/confirm-attendance" icon={faThumbsUp} title={"出勤確定処理"} onClose={closeMenu} />
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
          {isInSession ?
            <Box w={resp(90, 150, 150)} h={50} p={1} pt={2} textAlign="center" cursor="pointer" borderRadius={15} bg={isMenuOpened ? "rgba(255, 255, 255, 0.2)" : ""} _hover={{ background: "rgba(255, 255, 255, 0.2)" }} transition=".2s ease-in" onClick={openMenu}>
              <FontAwesomeIcon className={isMenuOpened ? "rotate-icon" : ""} icon={faChevronCircleRight} fontSize="1.2rem" />
              <Text className="kr" fontSize={10} color="white">メニュー</Text>
            </Box>
            :
            <Box w={resp(90, 150, 150)} h={50} />
          }

          {/* ロゴ */}
          <Link href="/">
            <a>
              <Flex className="flex-center" w={resp(90, 150, 150)} h={50} textAlign="center">
                <Box position="relative" w="100%" style={{ height: 40 }}>
                  <Image src="/logos/logo-white.svg" layout="fill" priority={true} objectFit="contain" alt="White ShiftUP! logo" />
                </Box>
              </Flex>
            </a>
          </Link>

          {/* ユーザー名 */}
          {isInSession ?
            <Popover
              isOpen={isUserMenuOpened}
              onOpen={openUserMenu}
              onClose={closeUserMenu}
              placement="bottom"
            >
              <PopoverTrigger>
                <Flex className="flex-center" w={resp(90, 150, 150)} h={50} textAlign="center" cursor="pointer" borderRadius={15} _hover={{ background: "rgba(255, 255, 255, 0.2)" }} transition=".2s cubic-bezier(0.250, 0.250, 0.750, 0.750)">
                  <Text className="ksb" display="inline" fontSize={resp(13, 15, 17)} color="white">柏崎星奈</Text>
                  {responsiveType === "PC" || responsiveType === "Tablet" ? <Text className="kr" display="inline" fontSize={resp(10, 10, 12)} ml={1} color="white">さん</Text> : null}
                </Flex>
              </PopoverTrigger>
              <PopoverContent borderRadius={20} bg="rgba(98, 168, 228, 0.2)" backdropFilter="blur(5px)">
                <PopoverArrow bg="rgba(98, 168, 228, 0.2)" backdropFilter="blur(5px)" />
                <PopoverBody borderRadius={20} boxShadow="xl">
                  <Flex alignItems="center" justifyContent="space-around">
                    <Box className="ksb" w="8rem" p={2} fontSize="0.8rem" textAlign="center" cursor="pointer" borderRadius={15} color="white" bgGradient="linear(to-br, #a39af9, #469fff)" _hover={{ transform: "scale(1.05)" }} transition="all 0.3s 0s ease">
                      <FontAwesomeIcon icon={faScrewdriverWrench} fontSize="1.3rem" />
                      <Text>ユーザー情報編集</Text>
                    </Box>

                    <a href={process.env.NEXT_PUBLIC_SIGNOUT_URL}>
                      <Box className="ksb" w="8rem" p={2} fontSize="0.8rem" textAlign="center" cursor="pointer" borderRadius={15} color="white" bgGradient="linear(to-br, #a39af9, #469fff)" _hover={{ transform: "scale(1.05)" }} transition="all 0.3s 0s ease">
                        <FontAwesomeIcon icon={faArrowRightFromBracket} fontSize="1.3rem" />
                        <Text>サインアウト</Text>
                      </Box>
                    </a>
                  </Flex>
                </PopoverBody>
              </PopoverContent>
            </Popover>
            :
            <Box w={resp(90, 150, 150)} h={50} />
          }

        </Flex>
      </Box>
    </Box>
  )
}

export default memo(Header)