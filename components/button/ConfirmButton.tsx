// Chakra UI Components
import { Box } from "@chakra-ui/react"

// CSS Modules
import styles from "../../styles/button/ConfirmButton.module.css"

const ConfirmButton = (props: { text: string }) => {
  return <Box className={styles.confirmButton}>{props.text}</Box>
}

export default ConfirmButton