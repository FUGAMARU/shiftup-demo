// Next.js
import type { NextPage } from "next"
import Head from "next/head"

// Custom Components
import Header from "../components/header/Header"

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>ShiftUP!</title>
      </Head>
      <Header />
    </>
  )
}

export default Home
