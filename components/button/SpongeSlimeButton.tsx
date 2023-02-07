// React
import { memo } from "react"

// Chakra UI Components
import { Text, Flex } from "@chakra-ui/react"

// Custom Hooks
import { useDevicePixelRatio } from "use-device-pixel-ratio"

// Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconProp } from "@fortawesome/fontawesome-svg-core"

interface Props {
  text: string,
  h?: string | number,
  w?: string | number,
  fontSize?: string | number,
  iconSize?: string | number
  icon?: IconProp,
  func?: VoidFunction
}

const SpongeSlimeButton = (props: Props) => {
  const dpr = useDevicePixelRatio()

  return (
    <Flex className={`${dpr > 1 ? "kb" : "ksb"} flex-center`} h={props.h} w={props.w} color="white" bgGradient="linear(to-br, #a39af9, #469fff)" backdropFilter="blur(3px)" lineHeight={3} borderRadius={15} border="solid 1.8px #f0f0f0" flexDirection="column" textAlign="center" cursor="pointer" _hover={{ transform: "scale(1.05)" }} transition="all 0.3s 0s ease" onClick={props.func}>
      {props.icon ? <FontAwesomeIcon icon={props.icon} fontSize={props.iconSize} style={{ padding: "0.15rem" }} /> : null}
      <Text p={1} fontSize={props.fontSize} whiteSpace="pre-wrap">{props.text}</Text>
    </Flex>
  )
}

export default memo(SpongeSlimeButton)