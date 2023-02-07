// Next.js
import Router from "next/router"

// Chakra UI Components
import { Box, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react"

// Custom Components
import SimpleButton from "components/button/SimpleButton"

// Libraries
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons"

// Functions
import { resp } from "ts/functions"

interface Props {
  title: string,
  description: string
}

const ErrorView = (props: Props) => {
  return (
    <Box bg="#f5f5f7" pt={5}>
      <Alert status="error" w={resp("95%", "80%", "75%")} mx="auto" boxShadow="xl" borderRadius="15px" border="solid 0.5px red">
        <AlertIcon />
        <AlertTitle className="kb">{props.title}</AlertTitle>
        <AlertDescription className="kr">{props.description}</AlertDescription>
      </Alert>

      <Box mt={5}>
        <SimpleButton title="トップページに戻る" icon={faRightToBracket} onClick={() => Router.push("/")} />
      </Box>
    </Box>
  )
}

export default ErrorView