import { useState } from 'react'
import { useApp } from '../../context/AuthProvider'
import { ADMIN } from '../../utils/storage'

const Login = () => {
  const { login } = useApp()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    const result = login(email, password)
    if (!result.ok) {
      setError(result.error)
      setPassword('')
    }
  }

  const fill = (mail) => {
    setEmail(mail)
    setPassword('123')
    setError('')
  }

  return (
    <main className='flex min-h-screen items-center justify-center px-4 py-10'>
      <div className='rise w-full max-w-md'>
        <div className='mb-8 text-center'>
          <div className='mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-xl font-bold text-slate-950 shadow-lg shadow-emerald-500/30'>
            E
          </div>
          <h1 className='text-3xl font-semibold tracking-tight'>Welcome to EMS</h1>
          <p className='mt-2 text-sm text-slate-400'>Sign in to manage and track your team's tasks.</p>
        </div>

        <form onSubmit={submit} className='card space-y-5 p-7'>
          <div>
            <label htmlFor='email' className='label'>Email</label>
            <input
              id='email'
              type='email'
              required
              autoComplete='username'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='you@company.com'
              className='field'
            />
          </div>
          <div>
            <label htmlFor='password' className='label'>Password</label>
            <input
              id='password'
              type='password'
              required
              autoComplete='current-password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter your password'
              className='field'
            />
          </div>

          {error && (
            <p role='alert' className='rounded-lg border border-rose-400/30 bg-rose-400/10 px-3 py-2 text-sm text-rose-300'>
              {error}
            </p>
          )}

          <button type='submit' className='btn-primary w-full'>Log in</button>
        </form>

        <div className='mt-6 rounded-2xl border border-dashed border-white/10 p-4 text-center'>
          <p className='text-xs font-medium uppercase tracking-wide text-slate-500'>Demo accounts (password: 123)</p>
          <div className='mt-3 flex flex-wrap justify-center gap-2'>
            <button type='button' onClick={() => fill(ADMIN.email)} className='btn-ghost !px-3 !py-1.5 text-xs'>
              Admin
            </button>
            <button type='button' onClick={() => fill('e@e.com')} className='btn-ghost !px-3 !py-1.5 text-xs'>
              Employee (Arjun)
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Login
