import { useState } from 'react'
import { useApp } from '../../context/AuthProvider'
import { todayString } from '../../utils/status'

const empty = { taskTitle: '', taskDescription: '', taskDate: '', category: '', employeeId: '' }

const CreateTask = () => {
  const { employees, addTask } = useApp()
  const [form, setForm] = useState(empty)
  const [done, setDone] = useState('')

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    setDone('')
  }

  const submit = (e) => {
    e.preventDefault()
    const { employeeId, ...data } = form
    addTask(Number(employeeId), {
      ...data,
      taskTitle: data.taskTitle.trim(),
      taskDescription: data.taskDescription.trim(),
      category: data.category.trim(),
    })
    const person = employees.find((emp) => emp.id === Number(employeeId))
    setDone(`Task assigned to ${person?.firstName}.`)
    setForm(empty)
  }

  return (
    <section className='card p-6'>
      <h2 className='text-lg font-semibold'>Create a task</h2>
      <p className='mb-5 text-sm text-slate-400'>Assign new work to a team member.</p>

      <form onSubmit={submit} className='grid gap-5 md:grid-cols-2'>
        <div className='space-y-4'>
          <div>
            <label htmlFor='title' className='label'>Task title</label>
            <input id='title' required value={form.taskTitle} onChange={set('taskTitle')} placeholder='Make a UI design' className='field' />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label htmlFor='date' className='label'>Due date</label>
              <input id='date' type='date' required min={todayString()} value={form.taskDate} onChange={set('taskDate')} className='field' />
            </div>
            <div>
              <label htmlFor='category' className='label'>Category</label>
              <input id='category' required value={form.category} onChange={set('category')} placeholder='Design, Dev...' className='field' />
            </div>
          </div>
          <div>
            <label htmlFor='assign' className='label'>Assign to</label>
            <select id='assign' required value={form.employeeId} onChange={set('employeeId')} className='field'>
              <option value='' disabled>Select an employee</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>{emp.firstName}</option>
              ))}
            </select>
          </div>
        </div>

        <div className='flex flex-col'>
          <label htmlFor='desc' className='label'>Description</label>
          <textarea id='desc' required value={form.taskDescription} onChange={set('taskDescription')} placeholder='What needs to be done?' className='field min-h-32 flex-1 resize-none' />
          <button type='submit' className='btn-primary mt-4'>Create task</button>
          {done && <p role='status' className='mt-3 text-sm text-emerald-400'>✓ {done}</p>}
        </div>
      </form>
    </section>
  )
}

export default CreateTask
