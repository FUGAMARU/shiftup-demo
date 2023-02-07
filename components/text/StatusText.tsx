// React
import { memo } from "react"

// Chakra UI
import { Text } from "@chakra-ui/react"

interface Props {
  text: string
}

const StatusText = (props: Props) => <Text className="ksb" py={3} fontSize="0.85rem" textAlign="center">{props.text}</Text>

export default memo(StatusText)