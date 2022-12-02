// Chakra UI Components
import { Box, Text } from "@chakra-ui/react"

//Custom Components
import Header from "./header/Header"
import RibbonHeading from "./heading/RibbonHeading"
import Debugger from "./Debugger"

// Functions
import { resp } from "../functions"

interface Props {
  title?: string,
  statusMessage?: string,
  children: JSX.Element
}

const Body = (props: Props) => {
  return (
    <>
      <Header />
      <Box bg="#f5f5f7" pb={10}>
        <Box maxW={resp("95%", "90%", 900)} mx="auto" px={resp(6, 10, 14)} pb="4.5rem" position="relative" bg="white" boxShadow="2xl" borderBottomRadius={15}>
          <Box pt={6} pb={3}>
            <RibbonHeading text={props.title} />
          </Box>
          <Text className="ksb" py={3} fontSize="0.85rem" textAlign="center">{props.statusMessage}</Text>
          {props.children}
        </Box>
      </Box>
      {/*<Debugger />*/}
    </>
  )
}

export default Body