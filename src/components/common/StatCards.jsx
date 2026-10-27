import { STATUS, STATUS_ORDER } from '../../utils/status'

// Shows one card per status. Click a card to filter (when onSelect is given).
const StatCards = ({ counts, selected, onSelect }) => {
  const total = STATUS_ORDER.reduce((sum, s) => sum + counts[s], 0)

  return (
    <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
      {STATUS_ORDER.map((key, i) => {
        const s = STATUS[key]
        const active = selected === key
        const pct = total ? Math.round((counts[key] / total) * 100) : 0
        const Tag = onSelect ? 'button' : 'div'
        return (
          <Tag
            key={key}
            type={onSelect ? 'button' : undefined}
            onClick={onSelect ? () => onSelect(active ? 'all' : key) : undefined}
            style={{ animationDelay: `${i * 60}ms` }}
            className={`card rise p-5 text-left transition ${
              onSelect ? 'hover:bg-white/[0.08]' : ''
            } ${active ? 'ring-2 ring-emerald-400/60' : ''}`}
          >
            <div className='flex items-center gap-2 text-sm text-slate-400'>
              <span className={`h-2 w-2 rounded-full ${s.dot}`} />
              {s.label}
            </div>
            <p className='mt-2 text-4xl font-semibold tabular-nums'>{counts[key]}</p>
            <div className='mt-4 h-1.5 overflow-hidden rounded-full bg-white/10'>
              <div className={`h-full rounded-full bg-gradient-to-r ${s.bar}`} style={{ width: `${pct}%` }} />
            </div>
          </Tag>
        )
      })}
    </div>
  )
}

export default StatCards
