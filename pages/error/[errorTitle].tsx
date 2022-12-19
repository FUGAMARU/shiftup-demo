// Next.js
import type { NextPage, InferGetStaticPropsType, GetStaticPaths } from "next"
import { useRouter } from "next/router"
import Head from "next/head"

// Chakra UI Components
import { Box, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react"

// Custom Components
import Header from "../../components/header/Header"
import SimpleButton from "../../components/button/SimpleButton"

// Libraries
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons"

// Functions
import { resp } from "../../functions"

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
  const jsonPath = path.join(process.cwd(), "json", "error.json")
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

      <Box bg="#f5f5f7" pt={5}>
        <Alert status="error" w={resp("95%", "80%", "75%")} mx="auto" boxShadow="xl" borderRadius="15px" border="solid 0.5px red">
          <AlertIcon />
          <AlertTitle className="kb">{errors[errorTitle as string].title}</AlertTitle>
          <AlertDescription className="kr">{errors[errorTitle as string].detail}</AlertDescription>
        </Alert>

        <Box mt={5}>
          <SimpleButton title="トップページに戻る" icon={faRightToBracket} onClick={() => router.push("/")} />
        </Box>
      </Box>
    </Box>
  )
}

export default Error