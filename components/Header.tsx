// Chakra UI Components
import { Flex, Text, Box } from "@chakra-ui/react"

// Custom Components
import Menu from "./Menu"

const Header = () => {
  return (
    <Box position="relative" zIndex={5} bgGradient="linear(to-br, #48C3EB, #718EDD)" shadow="lg" px={5} color="white">
      <Flex maxW="1300px" m="0 auto" justifyContent="space-between" alignItems="center">
        <Flex w={200} h={50} alignItems="center" justifyContent="center" textAlign="center" cursor="pointer" p={1} borderRadius={15} _hover={{ background: "rgba(255, 255, 255, 0.2)" }}>
          <Menu />
        </Flex>
        <Box w={200} h={50} textAlign="center" alignItems="center">
          <Text className="dbs" fontSize={{ base: 1, md: "2.5rem", lg: "2.5rem" }} mb="-0.5rem">ShfitUP!</Text>
        </Box>
        <Flex w={200} h={50} alignItems="center" justifyContent="center" textAlign="center" color="white" cursor="pointer" borderRadius={15} _hover={{ background: "rgba(255, 255, 255, 0.2)" }}>
          <Text className="ksb" display="inline" fontSize={17}>夏目美緒</Text>
          <Text className="kr" display="inline" fontSize={12} ml={1}>さん</Text>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Header