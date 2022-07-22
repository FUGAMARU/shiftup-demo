// React Hooks
import { useState } from "react"

// Chakra UI Components
import { Box, Text, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverFooter, PopoverArrow, PopoverCloseButton } from "@chakra-ui/react"

// Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronCircleDown } from "@fortawesome/free-solid-svg-icons"

// Functions
import { resp } from "../../functions"

const Menu = () => {
  const [isOpenedMenu, setOpenedMenu] = useState<boolean>() //メニューが開いているかどうか

  return (
    <Popover closeOnBlur={true} isOpen={isOpenedMenu} onOpen={() => setOpenedMenu(true)} onClose={() => setOpenedMenu(false)}>
      <PopoverTrigger>
        <Box w={resp(90, 150, 150)} h={50} p={1} pt={2} textAlign="center" cursor="pointer" borderRadius={15} bg={isOpenedMenu ? "rgba(255, 255, 255, 0.2)" : ""} _hover={{ background: "rgba(255, 255, 255, 0.2)" }} transition=".2s ease-in">
          <FontAwesomeIcon className={isOpenedMenu ? "rotate-icon" : ""} icon={faChevronCircleDown} fontSize="1.2rem" />
          <Text className="kr" fontSize={10} color="white">メニュー</Text>
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