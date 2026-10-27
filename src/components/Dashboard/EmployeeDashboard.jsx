import { useState } from 'react'
import { useApp } from '../../context/AuthProvider'
import Header from '../common/Header'
import StatCards from '../common/StatCards'
import TaskCard from '../common/TaskCard'
import EmptyState from '../common/EmptyState'
import { countByStatus, STATUS } from '../../utils/status'

const EmployeeDashboard = () => {
  const { currentEmployee: me, logout, updateTaskStatus } = useApp()
  const [filter, setFilter] = useState('all')

  const counts = countByStatus(me.tasks)
  const visible = filter === 'all' ? me.tasks : me.tasks.filter((t) => t.status === filter)

  return (
    <div className='mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6'>
      <Header name={me.firstName} role='Employee' onLogout={logout} />

      <StatCards counts={counts} selected={filter} onSelect={setFilter} />

      <section>
        <div className='mb-4 flex items-baseline justify-between'>
          <h2 className='text-lg font-semibold'>
            {filter === 'all' ? 'All my tasks' : `${STATUS[filter].label} tasks`}
          </h2>
          {filter !== 'all' && (
            <button onClick={() => setFilter('all')} className='text-sm text-emerald-400 hover:underline'>
              Show all
            </button>
          )}
        </div>

        {visible.length === 0 ? (
          <EmptyState title='No tasks here' text='When your admin assigns you a task, it will show up on this page.' />
        ) : (
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {visible.map((t) => (
              <TaskCard key={t.id} task={t} onStatusChange={(id, status) => updateTaskStatus(me.id, id, status)} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default EmployeeDashboard
