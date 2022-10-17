// Chakra UI Components
import { Flex, Text } from "@chakra-ui/react"

// Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconProp } from "@fortawesome/fontawesome-svg-core"

// Functions
import { resp } from "../../functions"

interface Props {
  title: string,
  icon: IconProp,
  onClick: VoidFunction
}

const SimpleButton = (props: Props) => {
  return (
    <Flex className="hover-zoom" w={`${props.title.length + 5}rem`} mx="auto" mb={resp(10, 0, 0)} p={2} bg="white" borderRadius={15} justifyContent="center" alignItems="center" boxShadow="lg" cursor="pointer" onClick={() => props.onClick()}>
      <Text className="kb" mr={3}>{props.title}</Text>
      <FontAwesomeIcon icon={props.icon} />
    </Flex>
  )
}

export default SimpleButton