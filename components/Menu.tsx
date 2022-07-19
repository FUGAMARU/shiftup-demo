// React Hooks
import { useState } from "react"

// Chakra UI Components
import { Box, Text, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverFooter, PopoverArrow, PopoverCloseButton } from "@chakra-ui/react"

// Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronCircleDown } from "@fortawesome/free-solid-svg-icons"

const Menu = () => {
  const [isOpenMenu, setOpenMenu] = useState<boolean>() //Popoverが開いているかどうか

  return (
    <Popover
      closeOnBlur={true} isOpen={isOpenMenu} onOpen={() => setOpenMenu(true)} onClose={() => setOpenMenu(false)}
    >
      <PopoverTrigger>
        <Box cursor="pointer">
          <FontAwesomeIcon icon={faChevronCircleDown} fontSize={20} />
          <Text className="kr" fontSize={10}>メニュー</Text>
        </Box>
      </PopoverTrigger>
      <PopoverContent borderRadius={15} textAlign="left" color="#4a4a4a">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          <Text className="kb">管理メニュー</Text>
        </PopoverHeader>
        <PopoverBody>
          <Text className="kb">キャストメニュー</Text>
        </PopoverBody>
        <PopoverFooter>
          <Text className="kb">その他メニュー項目</Text>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}

export default Menu