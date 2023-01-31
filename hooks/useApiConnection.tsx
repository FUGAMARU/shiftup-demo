// React Hooks
import { useCallback, useMemo } from "react"

// Fetch
import useSWR from "swr"

// Request
import axios, { isAxiosError } from "axios"

// Interfaces
import { Survey, AvailableSurvey, SurveyResult } from "interfaces/Survey"
import { User, Invite } from "interfaces/User"
import { CreateSurvey } from "interfaces/request/CreateSurvey"
import { AddApprovedUser } from "interfaces/request/AddApprovedUser"
import { AttendanceRequest } from "interfaces/AttendanceRequest"
import { PersonalizedData } from "interfaces/PersonalizedData"

// Types
import { UseCheckboxGroupReturn } from "@chakra-ui/react"
import { RequestState } from "types/RequestState"
import { Position } from "types/Position"
import { Department } from "types/Department"

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
    const { data: statusCode, error } = useSWR(url, statusCodeFetcher)
    return { statusCode, error }
  }, [isProdEnv])

  const getMyName = useCallback(() => {
    const url = isProdEnv ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me/name` : `${process.env.NEXT_PUBLIC_API_BASE_URL}/name`
    const { data, error } = useSWR(url, fetcher)
    return { data, error }
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

  const getPersonalizedData = useCallback(() => {
    const url = isProdEnv ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me/detail` : `${process.env.NEXT_PUBLIC_API_BASE_URL}/toppage`
    const { data, error } = useSWR<PersonalizedData, Error>(url, fetcher)
    const fetchErrorMessage = error ? "個人用データーの取得に失敗しました" : ""
    return { data, fetchErrorMessage }
  }, [isProdEnv])

  const getAllSurveys = useCallback(() => {
    const url = isProdEnv ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/attendance/surveys` : `${process.env.NEXT_PUBLIC_API_BASE_URL}/surveys`
    const { data, error, mutate } = useSWR<Survey[], Error>(url, fetcher, { fallback: [] })
    const fetchErrorMessage = error ? "アンケート一覧の取得に失敗しました" : ""
    return { data, fetchErrorMessage, mutate }
  }, [isProdEnv])

  const getAllSchedules = useCallback(() => {
    const { data, fetchErrorMessage: errorMsg } = getAllSurveys()
    const allSchedules = data?.flatMap(survey => survey.openCampusSchedule)
    const fetchErrorMessage = errorMsg ? "アンケートの日程一覧の取得に失敗しました" : ""
    return { allSchedules, fetchErrorMessage }
  }, [isProdEnv])

  // 受付状態のアンケートのみ取得
  const getAnswerableSurveys = useCallback(() => {
    const url = isProdEnv ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me/attendance/surveys` : `${process.env.NEXT_PUBLIC_API_BASE_URL}/surveys/me`
    const { data, error, mutate } = useSWR<AvailableSurvey[], Error>(url, fetcher, { fallback: [] })
    const fetchErrorMessage = error ? "アンケート一覧の取得に失敗しました" : ""
    return { data, fetchErrorMessage, mutate }
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
    const { data, error, mutate } = useSWR<Invite[], Error>(url, fetcher, { fallback: [] })
    const fetchErrorMessage = error ? "ユーザー一覧の取得に失敗しました" : ""
    return { data, fetchErrorMessage, mutate }
  }, [isProdEnv])

  const getAllRequests = useCallback(() => {
    const url = isProdEnv ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me/attendance/requests/divided` : `${process.env.NEXT_PUBLIC_API_BASE_URL}/requests`
    const { data, error, mutate } = useSWR<AttendanceRequest, Error>(url, fetcher, { fallback: [] })
    const fetchErrorMessage = error ? "出勤依頼一覧の取得に失敗しました" : ""
    return { data, fetchErrorMessage, mutate }
  }, [isProdEnv])

  // リクエストを2回送る関係でuseSWRではなくAxiosを使用
  const getConfirmedUsers = useCallback(async (date: string) => {
    try {
      const baseUrl = isProdEnv ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/attendance/requests/${date}/casts?state=` : `${process.env.NEXT_PUBLIC_API_BASE_URL}/requests/${date}?state=`
      const acceptedUsers = date ? (await axios.get<User[]>(baseUrl + "Accepted")).data : undefined
      const declinedUsers = date ? (await axios.get<User[]>(baseUrl + "Declined")).data : undefined
      return { acceptedUsers, declinedUsers }
    } catch {
      throw new Error("出勤確定/辞退一覧の取得に失敗しました")
    }
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

  const switchUserPosition = useCallback(async (userId: string, to: Position) => {
    try {
      const url = isProdEnv ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/invites/${userId}/position` : `${process.env.NEXT_PUBLIC_API_BASE_URL}/invites/${userId}`
      await axios.put(url, to)
    } catch {
      throw new Error("ユーザーの役職の切り替えに失敗しました")
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

  const confirmAttendance = useCallback(async (schedule: string, action: Exclude<RequestState, "Blank">) => {
    try {
      const url = isProdEnv ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me/attendance/requests/${schedule}/state` : `${process.env.NEXT_PUBLIC_API_BASE_URL}/requests`
      await axios.post(url, action)
    } catch {
      throw new Error(`出勤${action === "Accepted" ? "確定" : "辞退"}に失敗しました`)
    }
  }, [isProdEnv])

  const changeRequestState = useCallback(async (date: string, userId: string, state: RequestState) => {
    try {
      const url = isProdEnv ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me/attendance/requests/${date}/${userId}/state` : `${process.env.NEXT_PUBLIC_API_BASE_URL}/requests/${date}`
      await axios.put(url, state)
    } catch {
      throw new Error("出勤依頼の確定状態の変更に失敗しました")
    }
  }, [isProdEnv])

  const updateProfile = useCallback(async (newName: string, newDept: Department) => {
    try {
      const nameUpdateUrl = isProdEnv ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me/name` : `${process.env.NEXT_PUBLIC_API_BASE_URL}/name`
      const deptUpdateUrl = isProdEnv ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me/department` : `${process.env.NEXT_PUBLIC_API_BASE_URL}/name`
      await axios.put(nameUpdateUrl, newName)
      await axios.put(deptUpdateUrl, newDept)
    } catch {
      throw new Error("プロフィールの更新に失敗しました")
    }
  }, [isProdEnv])
  return { getSession, getMyName, getRole, getCurrentTime, getPersonalizedData, getAllSurveys, getAllSchedules, getAnswerableSurveys, getSurveyResult, getAllUsers, getAllRequests, getConfirmedUsers, sendRequests, createSurvey, answerSurvey, switchSurveyAvailability, switchUserPosition, deleteSurvey, addApprovedUser, deleteUser, confirmAttendance, changeRequestState, updateProfile }
}