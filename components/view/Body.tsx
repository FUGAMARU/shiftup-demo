// React
import { memo } from "react"

// Chakra UI Components
import { Box } from "@chakra-ui/react"

//Custom Components
import Header from "components/header/Header"
import RibbonHeading from "components/heading/RibbonHeading"
import StatusText from "components/text/StatusText"
import Debugger from "components/Debugger"

// Functions
import { resp } from "ts/functions"

interface Props {
  title?: string,
  statusMessage?: string,
  children: React.ReactNode
}

const Body = (props: Props) => {
  return (
    <Box>
      <Header />
      <Box bg="#f5f5f7" pb={10}>
        <Box maxW={resp("95%", "90%", 900)} mx="auto" px={resp(6, 10, 14)} pb="4.5rem" position="relative" bg="white" boxShadow="2xl" borderBottomRadius={15}>
          <Box pt={6} pb={3}>
            <RibbonHeading text={props.title} />
          </Box>
          {props.statusMessage ? <StatusText text={props.statusMessage} /> : null}
          {props.children}
        </Box>
      </Box>
      {/*<Debugger />*/}
    </Box>
  )
}

export default memo(Body)