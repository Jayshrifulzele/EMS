const EmptyState = ({ title, text }) => (
  <div className='card flex flex-col items-center px-6 py-14 text-center'>
    <div className='mb-3 text-3xl'>📭</div>
    <h3 className='font-semibold'>{title}</h3>
    <p className='mt-1 max-w-sm text-sm text-slate-400'>{text}</p>
  </div>
)

export default EmptyState
