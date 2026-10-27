import { STATUS, formatDate, isOverdue } from '../../utils/status'

const TaskCard = ({ task, onStatusChange }) => {
  const s = STATUS[task.status]
  const overdue = isOverdue(task)

  return (
    <article className='card rise flex flex-col p-5'>
      <div className='flex items-start justify-between gap-3'>
        <span className='rounded-md bg-white/10 px-2.5 py-1 text-xs font-medium text-slate-300'>
          {task.category || 'General'}
        </span>
        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${s.badge}`}>
          {s.label}
        </span>
      </div>

      <h3 className='mt-4 text-lg font-semibold leading-snug'>{task.taskTitle}</h3>
      <p className='mt-1.5 flex-1 text-sm leading-relaxed text-slate-400'>{task.taskDescription}</p>

      <p className={`mt-4 text-xs ${overdue ? 'font-medium text-rose-300' : 'text-slate-500'}`}>
        Due {formatDate(task.taskDate)}
        {overdue && ' · Overdue'}
      </p>

      {task.status === 'new' && (
        <button onClick={() => onStatusChange(task.id, 'active')} className='btn-primary mt-4 w-full'>
          Accept task
        </button>
      )}
      {task.status === 'active' && (
        <div className='mt-4 grid grid-cols-2 gap-2'>
          <button onClick={() => onStatusChange(task.id, 'completed')} className='btn-primary'>
            Mark done
          </button>
          <button
            onClick={() => onStatusChange(task.id, 'failed')}
            className='btn-ghost hover:!border-rose-400/40 hover:!text-rose-300'
          >
            Mark failed
          </button>
        </div>
      )}
      {(task.status === 'completed' || task.status === 'failed') && (
        <button onClick={() => onStatusChange(task.id, 'active')} className='btn-ghost mt-4 w-full'>
          Reopen
        </button>
      )}
    </article>
  )
}

export default TaskCard
