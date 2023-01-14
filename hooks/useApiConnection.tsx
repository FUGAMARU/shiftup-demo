// React Hooks
import { useCallback, useMemo } from "react"

// Fetch
import useSWR from "swr"

// Request
import axios, { isAxiosError } from "axios"

// Interfaces
import { Survey } from "interfaces/Survey"
import { AvailableSurvey } from "interfaces/AvailableSurvey"
import { SurveyResult } from "interfaces/SurveyResult"
import { User } from "interfaces/User"
import { CreateSurvey } from "interfaces/request/CreateSurvey"
import { AddApprovedUser } from "interfaces/request/AddApprovedUser"

// Type Alias
import { UseCheckboxGroupReturn } from "@chakra-ui/react"

// Error Classes
import AlreadyAddedError from "classes/AlreadyAddedError"

// Fetchers
const fetcher = (url: string) => fetch(url).then((res) => res.json())
const statusCodeFetcher = (url: string) => fetch(url).then((res) => res.status)

export const useApiConnection = () => {
  const isProdEnv = useMemo(() => process.env.NODE_ENV === "production", [process.env.NODE_ENV])

  /* Fetch Functions */
  const getSession = useCallback(() => {
    const url = isProdEnv ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/session-available` : "http://httpbin.org/status/200"
    const { data: statusCode, error } = useSWR(url, statusCodeFetcher, { fallback: [] })
    return { statusCode, error }
  }, [isProdEnv])

  const getRole = useCallback(() => {
    const url = isProdEnv ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me/roles` : `${process.env.NEXT_PUBLIC_API_BASE_URL}/role`
    const { data, error } = useSWR(url, fetcher, { fallback: [] })
    return { data, error }
  }, [isProdEnv])

  const getCurrentTime = useCallback(() => {
    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_WORLD_TIME_API_URL}`, fetcher)
    let time = new Date(0)
    if (data) time = new Date(data.datetime)
    return { time, error }
  }, [])

  const getAllSurveys = useCallback(() => {
    const url = isProdEnv ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/attendance/surveys` : `${process.env.NEXT_PUBLIC_API_BASE_URL}/surveys`
    const { data, error, mutate } = useSWR<Survey[], Error>(url, fetcher, { fallback: [] })
    const fetchErrorMessage = error ? "アンケート一覧の取得に失敗しました" : ""
    return { data, fetchErrorMessage, mutate }
  }, [isProdEnv])

  // 受付状態のアンケートのみ取得
  const getAnswerableSurveys = useCallback(() => {
    const url = isProdEnv ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me/attendance/surveys` : `${process.env.NEXT_PUBLIC_API_BASE_URL}/surveys/me`
    const { data, error } = useSWR<AvailableSurvey[], Error>(url, fetcher, { fallback: [] })
    const fetchErrorMessage = error ? "アンケート一覧の取得に失敗しました" : ""
    return { data, fetchErrorMessage }
  }, [isProdEnv])

  // 日程選択する度に取得する & 取得したデーターはそのブロックでしか使わない(stateなどでグローバルにする必要がない)のでSWRではなくAxiosを使用
  const getSurveyResult = useCallback(async (surveyId: string) => {
    try {
      const url = isProdEnv ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/attendance/surveys/${surveyId}/result` : `${process.env.NEXT_PUBLIC_API_BASE_URL}/surveys/${surveyId}`
      return (await axios.get<SurveyResult>(url)).data
    } catch {
      throw new Error("アンケート情報の取得に失敗しました")
    }
  }, [isProdEnv])

  const getAllUsers = useCallback(() => {
    const url = isProdEnv ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/invites` : `${process.env.NEXT_PUBLIC_API_BASE_URL}/invites`
    const { data, error, mutate } = useSWR<User[], Error>(url, fetcher, { fallback: [] })
    const fetchErrorMessage = error ? "ユーザー一覧の取得に失敗しました" : ""
    return { data, fetchErrorMessage, mutate }
  }, [isProdEnv])

  /* Request Functions */
  const sendRequests = useCallback(async (date: string, users: string[]) => {
    try {
      const url = isProdEnv ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/attendance/requests/${date}` : `${process.env.NEXT_PUBLIC_API_BASE_URL}/requests/${date}`
      await axios.put(url, users)
    } catch {
      throw new Error("確定依頼の送信に失敗しました")
    }
  }, [isProdEnv])

  const createSurvey = useCallback(async (requestBody: CreateSurvey) => {
    try {
      const url = isProdEnv ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/attendance/surveys` : `${process.env.NEXT_PUBLIC_API_BASE_URL}/surveys`
      await axios.post(url, requestBody)
    } catch {
      throw new Error("アンケートの作成に失敗しました")
    }
  }, [isProdEnv])

  const answerSurvey = useCallback(async (surveyId: string, schedules: UseCheckboxGroupReturn["value"]) => {
    try {
      const url = isProdEnv ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/attendance/surveys/${surveyId}/answers` : `${process.env.NEXT_PUBLIC_API_BASE_URL}/surveys/${surveyId}`
      await axios.put(url, schedules)
    } catch {
      throw new Error("アンケートの回答に失敗しました")
    }
  }, [isProdEnv])

  const switchSurveyAvailability = useCallback(async (surveyId: string, to: boolean) => {
    try {
      const url = isProdEnv ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/attendance/surveys/${surveyId}/available` : `${process.env.NEXT_PUBLIC_API_BASE_URL}/surveys/${surveyId}`
      await axios.put(url, to.toString())
    } catch {
      throw new Error("アンケートの受付状態の切り替えに失敗しました")
    }
  }, [isProdEnv])

  const deleteSurvey = useCallback(async (surveyId: string) => {
    try {
      const url = isProdEnv ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/attendance/surveys/${surveyId}` : `${process.env.NEXT_PUBLIC_API_BASE_URL}/surveys/${surveyId}`
      await axios.delete(url)
    } catch {
      throw new Error("アンケートの削除に失敗しました")
    }
  }, [isProdEnv])

  const addApprovedUser = useCallback(async (requestBody: AddApprovedUser) => {
    try {
      const url = isProdEnv ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/invites` : `${process.env.NEXT_PUBLIC_API_BASE_URL}/invites`
      await axios.post(url, requestBody)
    } catch (e) {
      if (isAxiosError(e) && e.response?.status === 405) throw new AlreadyAddedError("既に認可ユーザーとして追加済みです",)
      throw new Error("認可ユーザーの追加に失敗しました")
    }
  }, [isProdEnv])

  const deleteUser = useCallback(async (userId: string) => {
    try {
      const url = isProdEnv ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/invites/${userId}` : `${process.env.NEXT_PUBLIC_API_BASE_URL}/invites/${userId}`
      await axios.delete(url)
    } catch {
      throw new Error("ユーザーの削除に失敗しました")
    }
  }, [isProdEnv])

  return { getSession, getRole, getCurrentTime, getAllSurveys, getAnswerableSurveys, getSurveyResult, getAllUsers, sendRequests, createSurvey, answerSurvey, switchSurveyAvailability, deleteSurvey, addApprovedUser, deleteUser }
}