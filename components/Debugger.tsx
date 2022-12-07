// Custom Hooks
import { useResponsive } from "../hooks/useResponsive"

const Debugger = () => {
  const responsiveType = useResponsive()

  return <p>DisplayType: {responsiveType}</p>
}

export default Debugger