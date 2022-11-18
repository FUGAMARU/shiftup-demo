// Next.js
import type { AppProps } from "next/app"
import { useRouter } from "next/router"

// React Hooks
import { useEffect } from "react"

// Libraries
import "focus-visible/dist/focus-visible"
import { toggle } from "slide-element"

// Stylings
import { ChakraProvider } from "@chakra-ui/react"
import "../styles/globals.css"
import "animate.css"

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()

  const handleStart = (url: string) => {
    url !== router.asPath
    toggle(document.getElementById("loadingBanner") as HTMLElement)
  }

  const handleComplete = () => {
    setTimeout(() => {
      toggle(document.getElementById("loadingBanner") as HTMLElement)
    }, 300)
  }

  useEffect(() => {
    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  })

  return (
    <>
      <div id="loadingBanner" style={{ height: "1.5rem", display: "none", overflowX: "hidden" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ marginRight: "1rem" }}>
            <div className="spinner">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <p className="seanbecker blink">Now Loading!!!!</p>
        </div>
      </div>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}

export default MyApp
