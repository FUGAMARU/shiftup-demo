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
  title: JSX.Element,
  onClose: VoidFunction
}

const MenuItem = (props: Props) => {
  const router = useRouter()

  const handleButtonClick = () => {
    props.onClose()
    router.push(props.href)
  }

  return (
    <Flex className="kb flex-center" h={20} w={20} lineHeight={3} bg="white" boxShadow="2xl" borderRadius={15} flexDirection="column" textAlign="center" cursor="pointer" _hover={{ transform: "scale(1.05)" }} transition="all 0.3s 0s ease" onClick={handleButtonClick}>
      <FontAwesomeIcon icon={props.icon} fontSize={30} />
      <Text mt={2} fontSize={10}>{props.title}</Text>
    </Flex>
  )
}

export default MenuItem