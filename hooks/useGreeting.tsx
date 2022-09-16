// React Hooks
import { useState, useEffect } from "react"

// Libraries
import useSWRImmutable from "swr/immutable"
const fetcher = (url: string) => fetch(url).then((res) => res.json())

const useGreeting = (name: string) => {
  const { data: apiData, error } = useSWRImmutable("http://worldtimeapi.org/api/timezone/Asia/Tokyo", fetcher)
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    if (apiData) {
      const tenOclock = new Date()
      tenOclock.setHours(10)
      tenOclock.setMinutes(0)
      tenOclock.setSeconds(0)

      const seventeenOclock = new Date()
      seventeenOclock.setHours(17)
      seventeenOclock.setMinutes(0)
      seventeenOclock.setSeconds(0)

      const datetime = new Date(apiData.datetime)

      if (datetime < tenOclock) {
        setGreeting(`おはようございます、${name}さん。`)
      } else if (datetime >= tenOclock && datetime < seventeenOclock) {
        setGreeting(`こんにちは、${name}さん。`)
      } else {
        setGreeting(`こんばんは、${name}さん。`)
      }
    }

    if (error) {
      setGreeting(`ようこそ、${name}さん。`)
    }
  }, [apiData, error])

  return { greeting }
}

export default useGreeting