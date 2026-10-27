// One place for the look of each task status.
export const STATUS = {
  new: {
    label: 'New',
    dot: 'bg-sky-400',
    badge: 'bg-sky-400/10 text-sky-300 ring-sky-400/30',
    bar: 'from-sky-400 to-blue-500',
  },
  active: {
    label: 'In progress',
    dot: 'bg-amber-400',
    badge: 'bg-amber-400/10 text-amber-300 ring-amber-400/30',
    bar: 'from-amber-400 to-orange-500',
  },
  completed: {
    label: 'Completed',
    dot: 'bg-emerald-400',
    badge: 'bg-emerald-400/10 text-emerald-300 ring-emerald-400/30',
    bar: 'from-emerald-400 to-teal-500',
  },
  failed: {
    label: 'Failed',
    dot: 'bg-rose-400',
    badge: 'bg-rose-400/10 text-rose-300 ring-rose-400/30',
    bar: 'from-rose-400 to-red-500',
  },
}

export const STATUS_ORDER = ['new', 'active', 'completed', 'failed']

export const countByStatus = (tasks) => {
  const counts = { new: 0, active: 0, completed: 0, failed: 0 }
  tasks.forEach((t) => {
    counts[t.status] += 1
  })
  return counts
}

export const todayString = () => new Date().toISOString().slice(0, 10)

export const isOverdue = (t) =>
  (t.status === 'new' || t.status === 'active') && t.taskDate && t.taskDate < todayString()

export const formatDate = (iso) => {
  if (!iso) return 'No date'
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}
