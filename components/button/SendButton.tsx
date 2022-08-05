// React Hooks
import { useState } from "react"

// Chakra UI Components
import { Flex, Text, Spinner } from "@chakra-ui/react"

// CSS Modules
import styles from "../../styles/button/SendButton.module.css"

const SendButton = (props: { text: string }) => {
  const [animationTrigger, setAnimationTrigger] = useState(false)
  const [textClassSwitcher, setTextClassSwitcher] = useState(false)

  const handleButtonClick = () => {
    setTextClassSwitcher(true)
    setTimeout(() => {
      setAnimationTrigger(true)
    }, 700)
  }

  return (
    <Flex className={styles.animatedButton} w="13rem" h="3rem" textAlign="center" justifyContent="center" alignItems="center" onClick={handleButtonClick}>
      {!!!animationTrigger ? <Text className={textClassSwitcher ? "animate__animated animate__fadeOutUp animate__fast" : ""}>{props.text}</Text> : <Spinner />}
    </Flex>
  )
}

export default SendButton