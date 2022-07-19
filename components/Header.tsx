//Custom Hooks
import useResponsive from "../hooks/useResponsive"

// Next.js Components
import Image from "next/image"

// Chakra UI Components
import { Flex, Text, Box } from "@chakra-ui/react"

// Custom Components
import Menu from "./Menu"

// Functions
import { resp } from "../functions"

const Header = () => {
  const responsiveType = useResponsive() // SmartPhone, Tablet, PC

  return (
    <Box position="relative" zIndex={5} bgGradient="linear(to-br, #48C3EB, #718EDD)" shadow="lg" px={resp(1, 5, 5)} py={1} color="white">
      <Flex maxW="1300px" m="0 auto" justifyContent="space-between" alignItems="center">

        {/* メニューボタン */}
        <Menu />

        {/* ロゴ */}
        <Flex className="flex-center" w={resp(90, 150, 150)} h={50} textAlign="center">
          <Box position="relative" w="100%" style={{ height: 40 }}>
            <Image src="/logo-white.svg" layout="fill" objectFit="contain" />
          </Box>
        </Flex>

        {/* ユーザー名 */}
        <Flex className="flex-center" w={resp(90, 150, 150)} h={50} textAlign="center" cursor="pointer" borderRadius={15} _hover={{ background: "rgba(255, 255, 255, 0.2)" }} transition=".2s cubic-bezier(0.250, 0.250, 0.750, 0.750)">
          <Text className="ksb" display="inline" fontSize={resp(13, 15, 17)}>夏目美緒</Text>
          {responsiveType === "PC" || responsiveType === "Tablet" ? <Text className="kr" display="inline" fontSize={resp(10, 10, 12)} ml={1}>さん</Text> : null}
        </Flex>

      </Flex>
    </Box>
  )
}

export default Header