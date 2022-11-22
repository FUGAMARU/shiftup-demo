// Next.js
import { useRouter } from "next/router"
import Head from "next/head"

// Chakra UI Components
import { Box, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react"

// Custom Components
import Header from "./header/Header"
import SimpleButton from "./button/SimpleButton"

// Libraries
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons"

// Functions
import { resp } from "../functions"

interface Props {
  title: string,
  message: string
}

const Error = (props: Props) => {
  const router = useRouter()

  const returnToTop = () => {
    router.push("/")
  }

  return (
    <>
      <Head>
        <title>{props.title} | ShiftUP!</title>
      </Head>

      <Header />

      <Box bg="#f5f5f7" pt={5}>
        <Alert status="error" w={resp("95%", "80%", "75%")} mx="auto" boxShadow="xl" borderRadius="15px" border="solid 0.5px red">
          <AlertIcon />
          <AlertTitle className="kb">{props.title}</AlertTitle>
          <AlertDescription className="kr">{props.message}</AlertDescription>
        </Alert>

        <Box mt={5}>
          <SimpleButton title="トップページに戻る" icon={faRightToBracket} onClick={returnToTop} />
        </Box>
      </Box>
    </>
  )
}

export default Error