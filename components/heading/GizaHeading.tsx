// Chakra UI Components
import { Box } from "@chakra-ui/react"

// Functions
import { resp } from "ts/functions"

// CSS Modules
import styles from "styles/heading/BumpHeading.module.css"

const GizaHeading = () => {
  return (
    <Box className={styles.bumpHeading} w={resp(250, 300, 350)}></Box>
  )
}

export default GizaHeading