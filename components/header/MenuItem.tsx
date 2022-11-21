// Next.js Components
import { useRouter } from "next/router"

// Chakra UI Components
import { Text, Flex } from "@chakra-ui/react"

// Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconProp } from "@fortawesome/fontawesome-svg-core"

interface Props {
  href: string,
  icon: IconProp,
  title: string,
  onClose: VoidFunction
}

const MenuItem = (props: Props) => {
  const router = useRouter()

  const handleButtonClick = () => {
    props.onClose()
    router.push(props.href)
  }

  return (
    <Flex className="kb flex-center" h={20} w={20} color="white" bgGradient="linear(to-br, #a39af9, #469fff)" backdropFilter="blur(3px)" lineHeight={3} borderRadius={15} flexDirection="column" textAlign="center" cursor="pointer" _hover={{ transform: "scale(1.05)" }} transition="all 0.3s 0s ease" onClick={handleButtonClick}>
      <FontAwesomeIcon icon={props.icon} fontSize={30} />
      <Text mt={2} fontSize={10} whiteSpace="pre-wrap">{props.title}</Text>
    </Flex>
  )
}

export default MenuItem