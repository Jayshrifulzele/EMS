// All data is saved in the browser (localStorage), so no backend is needed.

const EMPLOYEES_KEY = 'ems:employees'
const SESSION_KEY = 'ems:session'

export const ADMIN = {
  name: 'Admin',
  email: 'admin@me.com',
  password: '123',
}

// Returns a date string (YYYY-MM-DD) that is `offset` days from today
const day = (offset) => {
  const d = new Date()
  d.setDate(d.getDate() + offset)
  return d.toISOString().slice(0, 10)
}

// status can be: 'new' | 'active' | 'completed' | 'failed'
const task = (id, taskTitle, taskDescription, taskDate, category, status) => ({
  id,
  taskTitle,
  taskDescription,
  taskDate,
  category,
  status,
})

export const seedEmployees = () => [
  {
    id: 1,
    firstName: 'Arjun',
    email: 'e@e.com',
    password: '123',
    tasks: [
      task('t1', 'Update website', 'Revamp the homepage design', day(2), 'Design', 'new'),
      task('t2', 'Client meeting', 'Discuss project requirements', day(-4), 'Meeting', 'completed'),
      task('t3', 'Fix bugs', 'Resolve bugs reported in issue tracker', day(1), 'Development', 'active'),
    ],
  },
  {
    id: 2,
    firstName: 'Sneha',
    email: 'employee2@example.com',
    password: '123',
    tasks: [
      task('t4', 'Database optimization', 'Optimize queries for better performance', day(-1), 'Database', 'active'),
      task('t5', 'Design new feature', 'Create mockups for the new feature', day(-5), 'Design', 'completed'),
    ],
  },
  {
    id: 3,
    firstName: 'Ravi',
    email: 'employee3@example.com',
    password: '123',
    tasks: [
      task('t6', 'Prepare presentation', 'Prepare slides for upcoming client presentation', day(3), 'Presentation', 'new'),
      task('t7', 'Code review', 'Review the codebase for optimization', day(0), 'Development', 'active'),
      task('t8', 'Testing', 'Test the latest build for bugs', day(-6), 'QA', 'completed'),
    ],
  },
  {
    id: 4,
    firstName: 'Priya',
    email: 'employee4@example.com',
    password: '123',
    tasks: [
      task('t9', 'Write documentation', 'Update the project documentation', day(4), 'Documentation', 'new'),
      task('t10', 'Set up CI/CD', 'Implement continuous integration pipeline', day(-2), 'DevOps', 'failed'),
    ],
  },
  {
    id: 5,
    firstName: 'Karan',
    email: 'employee5@example.com',
    password: '123',
    tasks: [
      task('t11', 'UI redesign', 'Redesign the user interface for better UX', day(5), 'Design', 'new'),
      task('t12', 'Deploy new build', 'Deploy the latest build to production', day(-3), 'DevOps', 'completed'),
      task('t13', 'Client feedback', 'Gather feedback from clients after product launch', day(2), 'Support', 'active'),
    ],
  },
]

const read = (key) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

const write = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // storage can be full or blocked - the app still works for this visit
  }
}

export const loadEmployees = () => {
  const saved = read(EMPLOYEES_KEY)
  return Array.isArray(saved) ? saved : seedEmployees()
}
export const saveEmployees = (employees) => write(EMPLOYEES_KEY, employees)
export const resetEmployees = () => {
  const fresh = seedEmployees()
  saveEmployees(fresh)
  return fresh
}

export const loadSession = () => read(SESSION_KEY)
export const saveSession = (session) => write(SESSION_KEY, session)
export const clearSession = () => {
  try {
    localStorage.removeItem(SESSION_KEY)
  } catch {
    // ignore
  }
}
