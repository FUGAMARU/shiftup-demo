// React Hooks
import { useState, useEffect } from "react"

// Custom Hooks
import { useApiConnection } from "hooks/useApiConnection"

// Chakra UI Components
import { Text } from "@chakra-ui/react"

// Functions
import { resp } from "ts/functions"

interface Props {
  name: string,
  fireCardAnimationTrigger: VoidFunction
}

const GreetingMessage = (props: Props) => {
  const [greeting, setGreeting] = useState("")
  const [classNameChanger, setClassNameChanger] = useState(false)
  const { name, fireCardAnimationTrigger } = props
  const { getCurrentTime } = useApiConnection()
  const { time, error } = getCurrentTime()

  useEffect(() => {
    if (time) {
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

      if (time >= fourOclock && time < tenOclock) { //4時〜9時59分
        setGreeting(`おはようございます、${name}さん。`)
      } else if (time >= tenOclock && time < seventeenOclock) { //10時〜16時59分
        setGreeting(`こんにちは、${name}さん。`)
      } else {
        setGreeting(`こんばんは、${name}さん。`)
      }
    }

    if (error) {
      setGreeting(`ようこそ、${name}さん。`)
    }

    setClassNameChanger(true)
    fireCardAnimationTrigger()
  }, [time, error, name, fireCardAnimationTrigger])

  return <Text className={classNameChanger ? "keb animate__animated greeting" : "hidden"} h={resp("1.8rem", "3rem", "3rem")} mb="1rem" fontSize={resp("1.2rem", "2rem", "2rem")} borderBottom="solid 1px gray">{greeting}</Text>
}

export default GreetingMessage