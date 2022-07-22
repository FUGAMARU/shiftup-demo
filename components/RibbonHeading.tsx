// Chakra UI Components
import { Box } from "@chakra-ui/react"

// Functions
import { resp } from "../functions"

// CSS Modules
import styles from "../styles/RibbonHeading.module.css"

const RibbonHeading = (props: { text?: string }) => {
  return (
    <Box textAlign="center">
      <Box className={styles.heading} color="white" display="inline-block" m="0 auto" px={5} fontSize={(resp(20, 20, 20))}>{props.text}</Box>
    </Box>
  )
}

export default RibbonHeading