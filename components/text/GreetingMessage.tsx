// React Hooks
import { useState, useEffect } from "react"

// Chakra UI Components
import { Text } from "@chakra-ui/react"

// Libraries
import useSWRImmutable from "swr/immutable"
const fetcher = (url: string) => fetch(url).then((res) => res.json())

// Functions
import { resp } from "../../functions"

interface Props {
  name: string,
  fireCardAnimationTrigger: VoidFunction
}

const GreetingMessage = (props: Props) => {
  const { data: apiData, error } = useSWRImmutable("http://worldtimeapi.org/api/timezone/Asia/Tokyo", fetcher)
  const [greeting, setGreeting] = useState("")
  const [classNameChanger, setClassNameChanger] = useState(false)

  useEffect(() => {
    if (apiData) {
      const fourOclock = new Date()
      fourOclock.setHours(4)
      fourOclock.setMinutes(0)
      fourOclock.setSeconds(0)

      const tenOclock = new Date()
      tenOclock.setHours(10)
      tenOclock.setMinutes(0)
      tenOclock.setSeconds(0)

      const seventeenOclock = new Date()
      seventeenOclock.setHours(17)
      seventeenOclock.setMinutes(0)
      seventeenOclock.setSeconds(0)

      const datetime = new Date(apiData.datetime)

      if (datetime >= fourOclock && datetime < tenOclock) { //4時〜9時59分
        setGreeting(`おはようございます、${props.name}さん。`)
      } else if (datetime >= tenOclock && datetime < seventeenOclock) { //10時〜16時59分
        setGreeting(`こんにちは、${props.name}さん。`)
      } else {
        setGreeting(`こんばんは、${props.name}さん。`)
      }
    }

    if (error) {
      setGreeting(`ようこそ、${props.name}さん。`)
    }

    setClassNameChanger(true)
    props.fireCardAnimationTrigger()
  }, [apiData, error])

  return <Text className={classNameChanger ? "keb animate__animated greeting" : "hidden"} h={resp("1.8rem", "3rem", "3rem")} mb="1rem" fontSize={resp("1.2rem", "2rem", "2rem")} borderBottom="solid 1px gray">{greeting}</Text>
}

export default GreetingMessage