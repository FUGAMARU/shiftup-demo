// React
import { memo, useCallback } from "react"

// Next.js Components
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"

//Custom Hooks
import { useResponsive } from "hooks/useResponsive"
import { useStatusCheck } from "hooks/useStatusCheck"

// Chakra UI Components
import { Flex, Text, Box, Drawer, SimpleGrid, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, Popover, PopoverTrigger, PopoverContent, PopoverBody, PopoverArrow } from "@chakra-ui/react"

// Custom Components
import ProfileEditModal from "components/modal/ProfileEditModal"
import SpongeSlimeButton from "components/button/SpongeSlimeButton"

// Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronCircleRight, faCalendarPlus, faListCheck, faCalendarCheck, faThumbsUp, faUserPlus, faArrowRightFromBracket, faScrewdriverWrench, faUsersGear, faSquarePollHorizontal, faClock } from "@fortawesome/free-solid-svg-icons"
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons"

// Global State Management
import { useRecoilValue } from "recoil"
import { sessionState } from "atoms/SessionStateAtom"
import { me } from "atoms/MeAtom"

// Functions
import { resp } from "ts/functions"

const Header = () => {
  useStatusCheck() // ページ遷移の度に呼ばれてかつRecoilが使えるコンポーネント内でこのメソッドを呼ぶ

  const isInSession = useRecoilValue(sessionState)
  const myInfo = useRecoilValue(me)

  const responsiveType = useResponsive() // SmartPhone, Tablet, PC
  const { isOpen: isMenuOpened, onOpen: openMenu, onClose: closeMenu } = useDisclosure()
  const { isOpen: isUserMenuOpened, onOpen: openUserMenu, onClose: closeUserMenu } = useDisclosure()
  const { isOpen: isProfileEditModalOpened, onOpen: openProfileEditModal, onClose: closeProfileEditModal } = useDisclosure()

  const router = useRouter()

  const jump = useCallback(async (path: string) => {
    closeMenu()
    await router.push(path)
  }, [router, closeMenu])

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
            <SpongeSlimeButton text="トップページに戻る" fontSize={14} func={() => jump("/")} />

            {myInfo.position === "Manager" ?
              <Box pt={5} pb={5}>
                <Box className="kb" borderBottom="solid 2px #615f5f">管理者メニュー</Box>
                <SimpleGrid columns={3} spacing={3} pt={3} justifyItems="center">
                  <SpongeSlimeButton h="5.1rem" w="5.1rem" text={"希望日程\nアンケート管理"} fontSize={10} icon={faSquarePollHorizontal} iconSize={30} func={() => jump("/management/manage-surveys")} />
                  <SpongeSlimeButton h="5.1rem" w="5.1rem" text={"希望日程\nアンケート作成"} fontSize={10} icon={faCalendarPlus} iconSize={30} func={() => jump("/management/create-survey")} />
                  <SpongeSlimeButton h="5.1rem" w="5.1rem" text={"希望日程\nアンケート集計"} fontSize={10} icon={faListCheck} iconSize={30} func={() => jump("/management/tally-survey")} />
                  <SpongeSlimeButton h="5.1rem" w="5.1rem" text={"出勤確定リスト\n確認"} fontSize={10} icon={faCheckCircle} iconSize={30} func={() => jump("/management/view-confirmed-attendances")} />
                  <SpongeSlimeButton h="5.1rem" w="5.1rem" text={"ユーザー管理"} fontSize={10} icon={faUsersGear} iconSize={30} func={() => jump("/management/manage-users")} />
                  <SpongeSlimeButton h="5.1rem" w="5.1rem" text={"認可ユーザー\n追加"} fontSize={10} icon={faUserPlus} iconSize={30} func={() => jump("/management/add-approved-user")} />
                  <SpongeSlimeButton h="5.1rem" w="5.1rem" text={"スケジュール\n管理"} fontSize={10} icon={faClock} iconSize={30} func={() => jump("/management/manage-schedule")} />
                </SimpleGrid>
              </Box>
              : null}

            <Box className="kb" pt={5} borderBottom="solid 2px #615f5f">キャストメニュー</Box>
            <SimpleGrid columns={3} spacing={3} pt={3} justifyItems="center">
              <SpongeSlimeButton h="5.1rem" w="5.1rem" text={"希望日程\nアンケート回答"} fontSize={10} icon={faCalendarCheck} iconSize={30} func={() => jump("/answer-survey")} />
              <SpongeSlimeButton h="5.1rem" w="5.1rem" text={"出勤確定処理"} fontSize={10} icon={faThumbsUp} iconSize={30} func={() => jump("/confirm-attendance")} />
            </SimpleGrid>

          </DrawerBody>
          <DrawerFooter>
            <Text fontSize={12}>© 2022-2023 TrinityTrick team</Text>
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
                  <Text className="ksb" display="inline" fontSize={resp(13, 15, 17)} color="white">{myInfo.name}</Text>
                  {responsiveType === "PC" || responsiveType === "Tablet" ? <Text className="kr" display="inline" fontSize={resp(10, 10, 12)} ml={1} color="white">さん</Text> : null}
                </Flex>
              </PopoverTrigger>
              <PopoverContent borderRadius={20} bg="rgba(98, 168, 228, 0.2)" backdropFilter="blur(5px)">
                <PopoverArrow bg="rgba(98, 168, 228, 0.2)" backdropFilter="blur(5px)" />
                <PopoverBody borderRadius={20} boxShadow="xl">
                  <Flex alignItems="center" justifyContent="space-around">
                    <SpongeSlimeButton w="8.5rem" h="3.8rem" text={"ユーザー情報編集"} fontSize={12} icon={faScrewdriverWrench} iconSize={22} func={openProfileEditModal} />
                    <SpongeSlimeButton w="8.5rem" h="3.8rem" text={"サインアウト"} fontSize={12} icon={faArrowRightFromBracket} iconSize={22} func={() => router.push(`${process.env.NEXT_PUBLIC_API_BASE_URL}/logout`)} />
                  </Flex>
                </PopoverBody>
              </PopoverContent>
            </Popover>
            :
            <Box w={resp(90, 150, 150)} h={50} />
          }

        </Flex>
      </Box>

      <ProfileEditModal isOpen={isProfileEditModalOpened} onClose={closeProfileEditModal} />
    </Box>
  )
}

export default memo(Header)