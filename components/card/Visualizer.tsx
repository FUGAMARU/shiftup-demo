// Chakra UI Components
import { Box, Text, Flex } from "@chakra-ui/react"

// Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { faCircleRight } from "@fortawesome/free-regular-svg-icons"

// CSS Modules
import styles from "../../styles/card/Visualizer.module.css"

interface Props {
  color: string,
  icon: IconProp,
  title: string,
  gradientColor1: string,
  gradientColor2: string,
  value: number,
  unit: string
}

const Visualizer = (props: Props) => {
  return (
    <Box className="hover-zoom" w="18rem" px={3} py={3} borderRadius={15} boxShadow="xl" cursor="pointer" borderTop={`solid 3px ${props.color}`} backgroundImage={`linear-gradient(-135deg, ${props.gradientColor1}, ${props.gradientColor2} 30px, #fff 0)`}>
      <Flex justifyContent="flex-start" alignItems="center">
        <Box className={styles.iconCircle} border={`solid 1px ${props.color}`}>
          <FontAwesomeIcon icon={props.icon} color={props.color} fontSize="1.2rem" />
        </Box>
        <Text className="kb" ml={1}>{props.title}</Text>
      </Flex>

      <Flex justifyContent="center" alignItems="flex-end">
        <Text className="keb" fontSize="2.5rem" lineHeight="40px">{props.value}</Text>
        <Text className="ksb" ml={2} mb="0.1rem" lineHeight="20px">{props.unit}</Text>
      </Flex>

      <Flex color="#718edd" justifyContent="flex-end" alignItems="center">
        <Text className="ksb" mr={1} _hover={{ textDecoration: "underline dotted" }}>詳しく見る</Text>
        <FontAwesomeIcon icon={faCircleRight} color={props.color} />
      </Flex>
    </Box>
  )
}

export default Visualizer