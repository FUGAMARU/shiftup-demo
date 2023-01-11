// Next.js
import Image from "next/image"

// Chakra UI Components
import { Box, Flex, Text } from "@chakra-ui/react"

// Functions
import { resp } from "ts/functions"

const Login = () => {
  return (
    <Flex className="flex-center" minHeight={resp("75vh", "85vh", "85vh")} bg="#f5f5f7">
      <Flex h="15rem" w={resp("85%", "25rem", "25rem")} flexDirection="column" justifyContent="center" bg="white" borderRadius={15} boxShadow="xl">
        <Box textAlign="center">
          <Image src="/logos/logo-full.svg" width={240} height={60} alt="ShiftUP! logo" />
        </Box>

        <Flex mx="auto" my={5} w="fit-content" cursor="pointer" borderRadius={7} boxShadow="lg" _hover={{ boxShadow: "3px 3px 14px 0px rgba(68, 132, 245, 0.7)" }} transition="all 0.3s 0s ease-out">
          <Flex className="flex-center" h="2.5rem" px={2} borderLeftRadius={7} border="solid 1px #4484f5">
            <Image src="/logos/google-logo.svg" width={26} height={26} alt="Google logo" />
          </Flex>

          <a href={process.env.NEXT_PUBLIC_SIGNIN_URL}>
            <Text className="kb" h="2.5rem" px={2} lineHeight="2.5rem" fontSize="0.85rem" color="white" bg="#4484f5" borderRightRadius={7}>Googleアカウントでサインイン</Text>
          </a>
        </Flex>

        <Box maxW="75%" mx="auto">
          <Text className="kr" textAlign="center" fontSize={resp("0.6rem", "0.6rem", "0.5rem")} color="#696969">ShiftUP!の利用には、日本工学院八王子専門学校、または東京工科大学に紐付けられたGoogleアカウントが必要です。</Text>
        </Box>
      </Flex>
    </Flex>
  )
}

export default Login