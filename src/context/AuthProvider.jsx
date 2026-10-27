/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'
import {
  ADMIN,
  clearSession,
  loadEmployees,
  loadSession,
  resetEmployees,
  saveEmployees,
  saveSession,
} from '../utils/storage'

export const AuthContext = createContext(null)

export const useApp = () => useContext(AuthContext)

const AuthProvider = ({ children }) => {
  const [employees, setEmployees] = useState(loadEmployees)
  const [session, setSession] = useState(loadSession)

  // save every change
  useEffect(() => {
    saveEmployees(employees)
  }, [employees])

  const login = (email, password) => {
    const mail = email.trim().toLowerCase()

    if (mail === ADMIN.email && password === ADMIN.password) {
      const s = { role: 'admin' }
      setSession(s)
      saveSession(s)
      return { ok: true }
    }

    const emp = employees.find((e) => e.email.toLowerCase() === mail && e.password === password)
    if (emp) {
      const s = { role: 'employee', id: emp.id }
      setSession(s)
      saveSession(s)
      return { ok: true }
    }

    return { ok: false, error: 'Wrong email or password. Please try again.' }
  }

  const logout = () => {
    setSession(null)
    clearSession()
  }

  const addTask = (employeeId, data) => {
    const newTask = { ...data, id: `t${Date.now()}`, status: 'new' }
    setEmployees((list) =>
      list.map((e) => (e.id === employeeId ? { ...e, tasks: [newTask, ...e.tasks] } : e)),
    )
  }

  const updateTaskStatus = (employeeId, taskId, status) => {
    setEmployees((list) =>
      list.map((e) =>
        e.id === employeeId
          ? { ...e, tasks: e.tasks.map((t) => (t.id === taskId ? { ...t, status } : t)) }
          : e,
      ),
    )
  }

  const deleteTask = (employeeId, taskId) => {
    setEmployees((list) =>
      list.map((e) =>
        e.id === employeeId ? { ...e, tasks: e.tasks.filter((t) => t.id !== taskId) } : e,
      ),
    )
  }

  const resetData = () => setEmployees(resetEmployees())

  const currentEmployee =
    session?.role === 'employee' ? employees.find((e) => e.id === session.id) : null

  const value = {
    employees,
    session,
    currentEmployee,
    login,
    logout,
    addTask,
    updateTaskStatus,
    deleteTask,
    resetData,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
