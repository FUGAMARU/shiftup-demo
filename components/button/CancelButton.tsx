// Chakra UI Components
import { Box } from "@chakra-ui/react"

// CSS Modules
import styles from "../../styles/button/CancelButton.module.css"

const CancelButton = (props: { text: string }) => {
  return <Box className={styles.cancelButton}>{props.text}</Box>
}

export default CancelButton