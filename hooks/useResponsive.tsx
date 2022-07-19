import { useBreakpointValue } from "@chakra-ui/react";

export const useResponsive = () => {
  return useBreakpointValue({ base: "SmartPhone", md: "Tablet", lg: "PC" })
}

export default useResponsive