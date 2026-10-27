import { useState } from 'react'
import { useApp } from '../../context/AuthProvider'
import { STATUS, STATUS_ORDER, formatDate, isOverdue } from '../../utils/status'
import EmptyState from '../common/EmptyState'

const AllTask = () => {
  const { employees, deleteTask } = useApp()
  const [status, setStatus] = useState('all')
  const [person, setPerson] = useState('all')

  const rows = employees
    .flatMap((emp) => emp.tasks.map((t) => ({ ...t, employee: emp })))
    .filter((r) => (status === 'all' || r.status === status) && (person === 'all' || r.employee.id === Number(person)))
    .sort((a, b) => a.taskDate.localeCompare(b.taskDate))

  return (
    <section className='card p-6'>
      <div className='mb-5 flex flex-wrap items-center justify-between gap-3'>
        <div>
          <h2 className='text-lg font-semibold'>All tasks</h2>
          <p className='text-sm text-slate-400'>{rows.length} task{rows.length === 1 ? '' : 's'} shown</p>
        </div>
        <div className='flex gap-3'>
          <select aria-label='Filter by employee' value={person} onChange={(e) => setPerson(e.target.value)} className='field !w-auto'>
            <option value='all'>All employees</option>
            {employees.map((e) => (
              <option key={e.id} value={e.id}>{e.firstName}</option>
            ))}
          </select>
          <select aria-label='Filter by status' value={status} onChange={(e) => setStatus(e.target.value)} className='field !w-auto'>
            <option value='all'>All statuses</option>
            {STATUS_ORDER.map((s) => (
              <option key={s} value={s}>{STATUS[s].label}</option>
            ))}
          </select>
        </div>
      </div>

      {rows.length === 0 ? (
        <EmptyState title='Nothing matches' text='Try a different filter, or create a new task above.' />
      ) : (
        <div className='overflow-x-auto'>
          <table className='w-full min-w-[640px] text-left text-sm'>
            <thead>
              <tr className='border-b border-white/10 text-xs uppercase tracking-wide text-slate-500'>
                <th className='py-3 pr-4 font-medium'>Employee</th>
                <th className='py-3 pr-4 font-medium'>Task</th>
                <th className='py-3 pr-4 font-medium'>Due</th>
                <th className='py-3 pr-4 font-medium'>Status</th>
                <th className='py-3 text-right font-medium'><span className='sr-only'>Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className='border-b border-white/5 last:border-0 hover:bg-white/[0.03]'>
                  <td className='py-3 pr-4 font-medium'>{r.employee.firstName}</td>
                  <td className='py-3 pr-4'>
                    {r.taskTitle}
                    <span className='ml-2 text-xs text-slate-500'>{r.category}</span>
                  </td>
                  <td className={`py-3 pr-4 ${isOverdue(r) ? 'text-rose-300' : 'text-slate-400'}`}>{formatDate(r.taskDate)}</td>
                  <td className='py-3 pr-4'>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${STATUS[r.status].badge}`}>
                      {STATUS[r.status].label}
                    </span>
                  </td>
                  <td className='py-3 text-right'>
                    <button
                      onClick={() => deleteTask(r.employee.id, r.id)}
                      aria-label={`Delete ${r.taskTitle}`}
                      className='rounded-md px-2 py-1 text-xs text-slate-500 transition hover:bg-rose-400/10 hover:text-rose-300'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default AllTask
