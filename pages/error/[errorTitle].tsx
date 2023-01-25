// Next.js
import type { NextPage, InferGetStaticPropsType, GetStaticPaths } from "next"
import { useRouter } from "next/router"
import Head from "next/head"

// Chakra UI Components
import { Box } from "@chakra-ui/react"

// Custom Components
import Header from "components/header/Header"
import ErrorView from "components/view/ErrorView"

// Importing Defined Errors
import * as fs from "fs"
import * as path from "path"
type Errors = { [key: string]: { title: string, detail: string } }
type Props = InferGetStaticPropsType<typeof getStaticProps>
type Params = { errorTitle: string }

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  return {
    paths: [
      { params: { errorTitle: "authentication-error" } },
      { params: { errorTitle: "invalid-user" } },
      { params: { errorTitle: "not-permitted" } },
      { params: { errorTitle: "unknown-error" } },
    ],
    fallback: false
  }
}

export const getStaticProps = async () => {
  const jsonPath = path.join(process.cwd(), "pages", "error", "errors.json")
  const jsonText = fs.readFileSync(jsonPath, "utf-8")
  const errors = JSON.parse(jsonText) as Errors

  return {
    props: { errors: errors }
  }
}

const Error: NextPage<Props> = ({ errors }) => {
  const router = useRouter()
  const { errorTitle } = router.query

  return (
    <Box>
      <Head>
        <title>{`${errors[errorTitle as string].title} | ShiftUP!`}</title>
      </Head>

      <Header />

      <ErrorView title={errors[errorTitle as string].title} description={errors[errorTitle as string].detail} />
    </Box>
  )
}

export default Error