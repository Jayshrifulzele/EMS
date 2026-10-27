import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { useApp } from './context/AuthProvider'

function App() {
  const { session, currentEmployee } = useApp()

  if (session?.role === 'admin') return <AdminDashboard />
  if (session?.role === 'employee' && currentEmployee) return <EmployeeDashboard />
  return <Login />
}

export default App
