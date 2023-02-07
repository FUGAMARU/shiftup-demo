// React Hooks
import { useCallback } from "react"

// Library
import { useToast, UseToastOptions } from "@chakra-ui/react"

export const useStyledToast = () => {
  const toast = useToast()

  const showToast = useCallback((title: string, description: string, status: UseToastOptions["status"]) => {
    toast({
      title: title,
      description: description,
      status: status,
      variant: "left-accent",
      position: "top-right"
    })
  }, [])

  return { showToast }
}