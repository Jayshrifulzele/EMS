const Header = ({ name, role, onLogout }) => {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <header className='flex flex-wrap items-center justify-between gap-4'>
      <div className='flex items-center gap-4'>
        <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-lg font-bold text-slate-950'>
          {name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className='text-sm text-slate-400'>{greeting} 👋</p>
          <h1 className='text-2xl font-semibold tracking-tight'>
            {name}
            <span className='ml-3 rounded-full bg-white/10 px-2.5 py-0.5 align-middle text-xs font-medium text-slate-300'>
              {role}
            </span>
          </h1>
        </div>
      </div>
      <button onClick={onLogout} className='btn-ghost hover:!border-rose-400/40 hover:!bg-rose-400/10 hover:!text-rose-300'>
        Log out
      </button>
    </header>
  )
}

export default Header
