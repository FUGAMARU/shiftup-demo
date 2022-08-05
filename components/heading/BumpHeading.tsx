// Chakra UI Components
import { Heading, Box } from "@chakra-ui/react"

// Functions
import { resp } from "../../functions"

// CSS Modules
import styles from "../../styles/heading/BumpHeading.module.css"

const BumpHeading = (props: { title: string }) => {
  return (
    <>
      <Heading className="kb" size="lg" textAlign="center">{props.title}</Heading>
      <Box className={styles.bumpHeading} w={resp(250, 300, 350)}></Box>
    </>
  )
}

export default BumpHeading