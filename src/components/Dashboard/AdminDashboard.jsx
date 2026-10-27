import { useApp } from '../../context/AuthProvider'
import Header from '../common/Header'
import StatCards from '../common/StatCards'
import CreateTask from '../other/CreateTask'
import AllTask from '../other/AllTask'
import { countByStatus } from '../../utils/status'

const AdminDashboard = () => {
  const { employees, logout, resetData } = useApp()
  const counts = countByStatus(employees.flatMap((e) => e.tasks))

  return (
    <div className='mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6'>
      <Header name='Admin' role='Administrator' onLogout={logout} />

      <StatCards counts={counts} />

      <CreateTask />
      <AllTask />

      <footer className='flex justify-center pb-4'>
        <button
          onClick={() => {
            if (window.confirm('Reset all tasks back to the demo data?')) resetData()
          }}
          className='text-xs text-slate-500 hover:text-slate-300'
        >
          Reset demo data
        </button>
      </footer>
    </div>
  )
}

export default AdminDashboard
