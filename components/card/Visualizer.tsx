// React
import { memo, useCallback } from "react"

// Next.js
import Router from "next/router"

// Chakra UI Components
import { Box, Text, Flex } from "@chakra-ui/react"

// Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconProp, IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { faCircleRight } from "@fortawesome/free-regular-svg-icons"

// CSS Modules
import styles from "styles/card/Visualizer.module.css"

interface Props {
  color: string,
  icon: IconProp | IconDefinition,
  title: string,
  gradientColor1: string,
  gradientColor2: string,
  value: number | string | undefined,
  unit: string,
  isShowButton: boolean,
  linkURL?: string
}

const Visualizer = ({ color, icon, title, gradientColor1, gradientColor2, value, unit, isShowButton, linkURL }: Props) => {
  const handleClick = useCallback(() => {
    if (linkURL) {
      if (linkURL.match(/^https.*$/)) {
        window.open(linkURL, "_blank")
      } else {
        Router.push(linkURL)
      }
    }
  }, [linkURL])

  return (
    <Box className="hover-zoom" w="18rem" h="7.5rem" px={3} py={3} borderRadius={15} boxShadow="xl" cursor="pointer" borderTop={`solid 3px ${color}`} backgroundImage={`linear-gradient(-135deg, ${gradientColor1}, ${gradientColor2} 30px, #fff 0)`} onClick={handleClick} >
      <Flex justifyContent="flex-start" alignItems="center">
        <Box className={styles.iconCircle} border={`solid 1px ${color}`}>
          <FontAwesomeIcon icon={icon} color={color} fontSize="1.2rem" />
        </Box>
        <Text className="kb" ml={1}>{title}</Text>
      </Flex>

      <Flex justifyContent="center" alignItems="flex-end">
        <Text className="keb" fontSize="2.5rem" lineHeight="40px">{value}</Text>
        {unit ? <Text className="ksb" ml={2} mb="0.1rem" lineHeight="20px">{unit}</Text> : null}
      </Flex>

      {isShowButton ?
        <Flex color="#718edd" justifyContent="flex-end" alignItems="center">
          <Text className="ksb" mr={1} _hover={{ textDecoration: "underline dotted" }}>詳しく見る</Text>
          <FontAwesomeIcon icon={faCircleRight} color={color} />
        </Flex>
        : null}
    </Box>
  )
}

export default memo(Visualizer)