// Next.js Components
import type { NextPage } from "next"

// Chakra UI Components
import { Box } from "@chakra-ui/react"

// Custom Components
import Header from "../../components/Header"

const CreateSurvey: NextPage = () => {
  return (
    <Box h="100vh" bg="#f2f2f2">
      <Header />
      <Box>
        アンケート作成ページ
      </Box>
    </Box>
  )
}

export default CreateSurvey
