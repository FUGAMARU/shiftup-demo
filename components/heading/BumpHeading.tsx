// Chakra UI Components
import { Text, Box } from "@chakra-ui/react"

// Functions
import { resp } from "../../functions"

// CSS Modules
import styles from "../../styles/heading/BumpHeading.module.css"

const BumpHeading = (props: { title: string }) => {
  return (
    <Box>
      <Text className="keb" fontSize={resp("1.4rem", "1.7rem", "1.8rem")} textAlign="center">{props.title}</Text>
      <Box className={styles.bumpHeading} w={resp(250, 300, 350)}></Box>
    </Box>
  )
}

export default BumpHeading