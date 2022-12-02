// Chakra UI Components
import { Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody } from "@chakra-ui/react"

interface Props {
  children: JSX.Element,
  isOpen: boolean,
  onClose: VoidFunction,
  errorMessage: string
}

const PopOver = (props: Props) => {
  return (
    <Popover isOpen={props.isOpen} onClose={props.onClose} autoFocus={false}>
      <PopoverTrigger>
        {props.children}
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow bg="red.100" />
        <PopoverBody className="ksb" color="red.500" bg="red.100">{props.errorMessage}</PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default PopOver