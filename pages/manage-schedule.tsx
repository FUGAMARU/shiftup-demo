// Next.js
import { NextPage } from "next"
import Head from "next/head"

// Chakra UI Components
import { Box } from "@chakra-ui/react"

// Custom Components
import Header from "../components/header/Header"

// Filter
import { withSession } from "../hoc/withSession"

const ManageSchedule: NextPage = () => {
  return (
    <Box>
      <Head>
        <title>スケジュール管理 | ShiftUP!</title>
      </Head>

      <Box mb={5}><Header /></Box>

      <Box h="100vh" m={0} p={0} overflow="hidden">
        <Box as="iframe" h="100%" w="100%" marginLeft={"40px"} border="0" src="../schedule/Jqschedule.html"style={{ width: "100%", height: "100%"  }}></Box>
      </Box>


    </Box>
  )
}

export default withSession(ManageSchedule)