import { useNavigate } from 'react-router-dom'

export default function RandomDiscovery() {
  const navigate = useNavigate()
  const locations = ['huaqingchi', 'huanghelou', 'chibi', 'xihu', 'yueyanglou', 'qinhuaihe']

  const handleRandom = () => {
    const id = locations[Math.floor(Math.random() * locations.length)]
    navigate(`/place/${id}`)
  }

  return (
    <div className="text-center">
      <button
        onClick={handleRandom}
        className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-xl shadow-md hover:shadow-lg border border-stone-200 text-stone-700 hover:text-amber-700 hover:border-amber-200 transition-all duration-300 group"
      >
        <svg className="w-5 h-5 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <span className="heading-font font-medium">随机一段交汇历史</span>
      </button>
      <p className="mt-2 text-xs text-stone-400">让命运帮你选一个地点</p>
    </div>
  )
}