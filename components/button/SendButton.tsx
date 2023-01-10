// React
import { useState, useEffect, useCallback, memo } from "react"

// Chakra UI Components
import { Flex, Text, Spinner, Fade, useDisclosure } from "@chakra-ui/react"

// Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleExclamation, faCircleCheck } from "@fortawesome/free-solid-svg-icons"

// CSS Modules
import styles from "../../styles/button/SendButton.module.css"

// Types
import { SendButtonState } from "../../types/SendButtonState"

interface Props {
  text: string,
  state: SendButtonState
  onClick?: VoidFunction
}

const SendButton = (props: Props) => {
  const [showText, setShowText] = useState(true)
  const [showSpinner, setShowSpinner] = useState(false)
  const [showCheckmark, setShowCheckmark] = useState(false)
  const [showError, setShowError] = useState(false)

  const { isOpen: textFade, onOpen: fadeInText, onClose: fadeOutText } = useDisclosure({ defaultIsOpen: true })
  const { isOpen: spinnerFade, onOpen: fadeInSpinner, onClose: fadeOutSpinner } = useDisclosure()
  const { isOpen: checkmarkFade, onOpen: fadeInCheckmark, onClose: fadeOutCheckmark } = useDisclosure()
  const { isOpen: errorFade, onOpen: fadeInError, onClose: fadeOutError } = useDisclosure()

  const [forceWhite, setForceWhite] = useState(false)

  const hideAll = useCallback(() => {
    // フェードアウト
    fadeOutText()
    fadeOutSpinner()
    fadeOutCheckmark()
    fadeOutError()

    //非表示
    setTimeout(() => {
      setShowText(false)
      setShowSpinner(false)
      setShowCheckmark(false)
      setShowError(false)
    }, 500)
  }, [fadeOutCheckmark, fadeOutError, fadeOutSpinner, fadeOutText])

  const changeToText = useCallback(() => {
    setTimeout(() => {
      hideAll()
      setTimeout(() => {
        setShowText(true)
        fadeInText()
      }, 500)
    }, 3000)
  }, [fadeInText, hideAll])

  useEffect(() => {
    if (props.state === "text") return

    hideAll()

    //表示・フェードイン
    setTimeout(() => {
      switch (props.state) {
        case "spinner":
          setShowSpinner(true)
          fadeInSpinner()
          break
        case "checkmark":
          setShowCheckmark(true)
          fadeInCheckmark()
          changeToText()
          break
        case "error":
          setShowError(true)
          fadeInError()
          changeToText()
          break
      }
    }, 550)

  }, [props.state, changeToText, fadeInCheckmark, fadeInError, fadeInSpinner, hideAll])

  const handleButtonClick = useCallback(() => {
    if (props.onClick) props.onClick()
  }, [props.onClick])

  return (
    <Flex className={styles.sendButton} w="13rem" h="3rem" _hover={{ backgroundColor: showError ? "#ee7578" : "#23c483", boxShadow: showError ? "0px 15px 20px rgba(238, 117, 120, 0.4)" : "0px 15px 20px rgba(46, 229, 157, 0.4)" }} textAlign="center" justifyContent="center" alignItems="center" onClick={handleButtonClick} onMouseEnter={() => setForceWhite(true)} onMouseLeave={() => setForceWhite(false)}>
      {showText ? <Fade in={textFade} style={{ transition: textFade ? "" : "all 0.4s linear" }}><Text>{props.text}</Text></Fade> : null}
      {showSpinner ? <Fade in={spinnerFade} style={{ paddingTop: "3px", transition: "all 0.4s linear" }}><Spinner /></Fade> : null}
      {showCheckmark ? <Fade in={checkmarkFade} style={{ paddingTop: "3px", transition: "all 0.4s linear" }}>
        <FontAwesomeIcon icon={faCircleCheck} color={forceWhite ? "white" : "#23c483"} fontSize="1.4rem" />
        <Text color={forceWhite ? "white" : "#23c483"} fontSize="0.5rem">完了</Text>
      </Fade> : null}
      {showError ? <Fade in={errorFade} style={{ paddingTop: "3px", transition: "all 0.4s linear" }}>
        <FontAwesomeIcon icon={faCircleExclamation} color={forceWhite ? "white" : "#ff6766"} fontSize="1.4rem" />
        <Text color={forceWhite ? "white" : "#ff6766"} fontSize="0.5rem">エラー</Text>
      </Fade> : null}
    </Flex>
  )
}

export default memo(SendButton)