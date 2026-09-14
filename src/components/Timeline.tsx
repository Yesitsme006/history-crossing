import type { HistoricalEvent } from '../types'

interface Props {
  events: HistoricalEvent[]
  activeEventId?: string
  onSelect: (id: string) => void
}

export default function Timeline({ events, activeEventId, onSelect }: Props) {
  const sorted = [...events].sort((a, b) => {
    const ya = extractYear(a.year)
    const yb = extractYear(b.year)
    return ya - yb
  })

  return (
    <div className="relative">
      {/* 垂直线 */}
      <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-300 via-amber-400 to-amber-300" />

      <div className="space-y-6">
        {sorted.map((event, i) => {
          const isActive = event.id === activeEventId
          return (
            <button
              key={event.id}
              onClick={() => onSelect(event.id)}
              className={`relative pl-14 w-full text-left group transition-all ${
                isActive ? 'scale-[1.02]' : ''
              }`}
            >
              {/* 时间轴圆点 */}
              <div className={`absolute left-3.5 top-2 w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 ${
                isActive
                  ? 'bg-amber-400 border-amber-500 shadow-md shadow-amber-200'
                  : 'bg-white border-stone-300 group-hover:border-amber-400'
              }`} />

              {/* 内容 */}
              <div className={`p-4 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-amber-50 border border-amber-200 shadow-sm'
                  : 'bg-white/60 border border-transparent group-hover:bg-amber-50/50 group-hover:border-stone-200'
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-sm font-bold ${isActive ? 'text-amber-700' : 'text-stone-500'}`}>
                    {event.year}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-amber-200 text-amber-800' : 'bg-stone-100 text-stone-500'
                  }`}>
                    {event.dynasty}
                  </span>
                  {i === 0 && (
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">最早</span>
                  )}
                  {i === sorted.length - 1 && sorted.length > 1 && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">最近</span>
                  )}
                </div>
                <h4 className={`font-medium heading-font ${isActive ? 'text-stone-900' : 'text-stone-700'}`}>
                  {event.title}
                </h4>
                {isActive && (
                  <p className="text-sm text-stone-600 mt-1 leading-relaxed">{event.summary}</p>
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function extractYear(yearStr: string): number {
  if (yearStr.includes('公元前')) {
    const num = parseInt(yearStr.replace(/[^0-9]/g, ''))
    return -num
  }
  if (yearStr.includes('传说')) return 9999
  const match = yearStr.match(/(\d+)/)
  return match ? parseInt(match[1]) : 9999
}