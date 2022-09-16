import { useBreakpointValue } from "@chakra-ui/react"

const useResponsive = () => {
  return useBreakpointValue({ base: "SmartPhone", md: "Tablet", lg: "PC" })
}

export default useResponsive