// Next.js
import { NextPage } from "next"
import Head from "next/head"

// Chakra UI Components
import { Box } from "@chakra-ui/react"

// Custom Components
import Header from "components/header/Header"
import ErrorView from "components/view/ErrorView"

const NotFoundPage: NextPage = () => {
  return (
    <Box>
      <Head>
        <title>404 Not Found | ShiftUP!</title>
      </Head>

      <Header />

      <ErrorView title="Not Found" description="ページが見つかりませんでした" />
    </Box>
  )
}

export default NotFoundPage