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
import { Me, AttendanceRequest, PersonalizedData } from "interfaces/Me"

// Types
import { UseCheckboxGroupReturn } from "@chakra-ui/react"
import { RequestState } from "types/RequestState"
import { Position } from "types/Position"
import { Department } from "types/Department"

// Classes
import AlreadyAddedError from "classes/AlreadyAddedError"
import Symbol from "classes/Symbol"

// Fetchers
const fetcher = (url: string) => fetch(url).then((res) => res.json())
const statusCodeFetcher = (url: string) => fetch(url).then((res) => res.status)

const API_BASE_URL = "http://localhost:3000/api/dev"

export const useApiConnection = () => {
  /* Fetch Functions */
  const getSession = useCallback(() => {
    const url = `${API_BASE_URL}/session`
    const { data: statusCode, error } = useSWR(url, statusCodeFetcher)
    return { statusCode, error }
  }, [])

  const getId = useCallback(() => {
    const url = `${API_BASE_URL}/id`
    const { data, error } = useSWR<string, Error>(url, fetcher)
    const fetchErrorMessage = error ? "ユーザーIDの取得に失敗しました" : ""
    return { data, fetchErrorMessage }
  }, [])

  const getMyInfo = useCallback(() => {
    const url = `${API_BASE_URL}/me`
    const { data, error } = useSWR<Me, Error>(url, fetcher)
    return { data, error }
  }, [])

  const getCurrentTime = useCallback(() => {
    const { data, error } = useSWR(`${API_BASE_URL}/time`, fetcher)
    let time = new Date(0)
    if (data) time = new Date(Number(data))
    return { time, error }
  }, [])

  const getPersonalizedData = useCallback(() => {
    const url = `${API_BASE_URL}/toppage`
    const { data, error } = useSWR<PersonalizedData, Error>(url, fetcher)
    const fetchErrorMessage = error ? "個人用データーの取得に失敗しました" : ""
    return { data, fetchErrorMessage }
  }, [])

  const getSuperUser = useCallback(() => {
    const url = `${API_BASE_URL}/invites/superuser`
    const { data, error } = useSWR<string, Error>(url, fetcher)
    const fetchErrorMessage = error ? "特殊権限ユーザーの取得に失敗しました" : ""
    return { data, fetchErrorMessage }
  }, [])

  const getAllSurveys = useCallback(() => {
    const url = `${API_BASE_URL}/surveys`
    const { data, error, mutate } = useSWR<Survey[], Error>(url, fetcher, { fallback: [] })
    const fetchErrorMessage = error ? "アンケート一覧の取得に失敗しました" : ""
    return { data, fetchErrorMessage, mutate }
  }, [])

  const getAllSchedules = useCallback(() => {
    const { data, fetchErrorMessage: errorMsg } = getAllSurveys()
    const allSchedules = data?.flatMap(survey => survey.openCampusSchedule)
    const fetchErrorMessage = errorMsg ? "アンケートの日程一覧の取得に失敗しました" : ""
    return { allSchedules, fetchErrorMessage }
  }, [])

  // 受付状態のアンケートのみ取得
  const getAnswerableSurveys = useCallback(() => {
    const url = `${API_BASE_URL}/surveys/me`
    const { data, error, mutate } = useSWR<AvailableSurvey[], Error>(url, fetcher, { fallback: [] })
    const fetchErrorMessage = error ? "アンケート一覧の取得に失敗しました" : ""
    return { data, fetchErrorMessage, mutate }
  }, [])

  // 日程選択する度に取得する & 取得したデーターはそのブロックでしか使わない(stateなどでグローバルにする必要がない)のでSWRではなくAxiosを使用
  const getSurveyResult = useCallback(async (surveyId: string) => {
    try {
      const url = `${API_BASE_URL}/surveys/${surveyId}`
      return (await axios.get<SurveyResult>(url)).data
    } catch {
      throw new Error("アンケート情報の取得に失敗しました")
    }
  }, [])

  const getAllUsers = useCallback(() => {
    const url = `${API_BASE_URL}/invites`
    const { data, error, mutate } = useSWR<Invite[], Error>(url, fetcher, { fallback: [] })
    const fetchErrorMessage = error ? "ユーザー一覧の取得に失敗しました" : ""
    return { data, fetchErrorMessage, mutate }
  }, [])

  const getAllRequests = useCallback(() => {
    const url = `${API_BASE_URL}/requests`
    const { data, error, mutate } = useSWR<AttendanceRequest, Error>(url, fetcher, { fallback: [] })
    const fetchErrorMessage = error ? "出勤依頼一覧の取得に失敗しました" : ""
    return { data, fetchErrorMessage, mutate }
  }, [])

  // リクエストを2回送る関係でuseSWRではなくAxiosを使用
  const getConfirmedUsers = useCallback(async (date: string) => {
    try {
      const baseUrl = `${API_BASE_URL}/requests/${date}?state=`
      const acceptedUsers = date ? (await axios.get<User[]>(baseUrl + "Accepted")).data : undefined
      const declinedUsers = date ? (await axios.get<User[]>(baseUrl + "Declined")).data : undefined
      return { acceptedUsers, declinedUsers }
    } catch {
      throw new Error("出勤確定/辞退一覧の取得に失敗しました")
    }
  }, [])

  /* Request Functions */
  const sendRequests = useCallback(async (date: string, users: string[]) => {
    try {
      const url = `${API_BASE_URL}/requests/${date}`
      await axios.put(url, users)
    } catch {
      throw new Error("確定依頼の送信に失敗しました")
    }
  }, [])

  const createSurvey = useCallback(async (requestBody: CreateSurvey) => {
    try {
      const url = `${API_BASE_URL}/surveys`
      await axios.post(url, requestBody)
    } catch {
      throw new Error("アンケートの作成に失敗しました")
    }
  }, [])

  const answerSurvey = useCallback(async (surveyId: string, schedules: UseCheckboxGroupReturn["value"]) => {
    try {
      const url = `${API_BASE_URL}/surveys/${surveyId}`
      await axios.put(url, schedules)
    } catch {
      throw new Error("アンケートの回答に失敗しました")
    }
  }, [])

  const switchSurveyAvailability = useCallback(async (surveyId: string, to: boolean) => {
    try {
      const url = `${API_BASE_URL}/surveys/${surveyId}`
      await axios.put(url, to.toString())
    } catch {
      throw new Error("アンケートの受付状態の切り替えに失敗しました")
    }
  }, [])

  const deleteSurvey = useCallback(async (surveyId: string) => {
    try {
      const url = `${API_BASE_URL}/surveys/${surveyId}`
      await axios.delete(url)
    } catch {
      throw new Error("アンケートの削除に失敗しました")
    }
  }, [])

  const addApprovedUser = useCallback(async (requestBody: AddApprovedUser) => {
    try {
      const url = `${API_BASE_URL}/invites`
      await axios.post(url, requestBody)
    } catch (e) {
      if (isAxiosError(e) && e.response?.status === 405) throw new AlreadyAddedError("既に認可ユーザーとして追加済みです",)
      throw new Error("認可ユーザーの追加に失敗しました")
    }
  }, [])

  const switchUserPosition = useCallback(async (userId: string, to: Position) => {
    try {
      const url = `${API_BASE_URL}/invites/${userId}`
      await axios.put(url, to)
    } catch {
      throw new Error("ユーザーの役職の切り替えに失敗しました")
    }
  }, [])

  const deleteUser = useCallback(async (userId: string) => {
    try {
      const url = `${API_BASE_URL}/invites/${userId}`
      await axios.delete(url)
    } catch {
      throw new Error("ユーザーの削除に失敗しました")
    }
  }, [])

  const confirmAttendance = useCallback(async (schedule: string, action: Exclude<RequestState, "Blank">) => {
    try {
      const url = `${API_BASE_URL}/requests`
      await axios.post(url, action)
    } catch {
      throw new Error(`出勤${action === "Accepted" ? "確定" : "辞退"}に失敗しました`)
    }
  }, [])

  const changeRequestState = useCallback(async (date: string, userId: string, state: RequestState) => {
    try {
      const url = `${API_BASE_URL}/requests/${date}`
      await axios.put(url, state)
    } catch {
      throw new Error("出勤依頼の確定状態の変更に失敗しました")
    }
  }, [])

  const updateName = useCallback(async (newName: string) => {
    try {
      const nameUpdateUrl = `${API_BASE_URL}/name`
      await axios.put(nameUpdateUrl, newName)
    } catch {
      throw new Error("名前の更新に失敗しました")
    }
  }, [])

  const updateDept = useCallback(async (newDept: Department) => {
    try {
      const url = `${API_BASE_URL}/name`
      await axios.put(url, newDept)
    } catch {
      throw new Error(`${Symbol.getSchoolType(newDept) === "NEEC" ? "学科" : "学部"}の更新に失敗しました`)
    }
  }, [])

  return { getSession, getId, getMyInfo, getCurrentTime, getPersonalizedData, getSuperUser, getAllSurveys, getAllSchedules, getAnswerableSurveys, getSurveyResult, getAllUsers, getAllRequests, getConfirmedUsers, sendRequests, createSurvey, answerSurvey, switchSurveyAvailability, switchUserPosition, deleteSurvey, addApprovedUser, deleteUser, confirmAttendance, changeRequestState, updateName, updateDept }
}