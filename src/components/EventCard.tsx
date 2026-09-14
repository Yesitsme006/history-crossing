import { useState } from 'react'
import type { HistoricalEvent } from '../types'

interface Props {
  event: HistoricalEvent
  expanded?: boolean
}

export default function EventCard({ event, expanded: initialExpanded = false }: Props) {
  const [expanded, setExpanded] = useState(initialExpanded)

  return (
    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 text-left flex items-start justify-between gap-3"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-bold text-amber-700">{event.year}</span>
            <span className="text-xs bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full">{event.dynasty}</span>
          </div>
          <h4 className="font-semibold text-stone-800 heading-font">{event.title}</h4>
          <p className="text-sm text-stone-500 mt-1 line-clamp-1">{event.summary}</p>
        </div>
        <svg
          className={`w-5 h-5 mt-1 text-stone-400 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {expanded && (
        <div className="px-4 pb-4 animate-fadeIn">
          <div className="border-t border-stone-100 pt-3">
            {/* 人物 */}
            {event.characters.length > 0 && (
              <div className="mb-3">
                <span className="text-xs text-stone-400 heading-font font-medium">关键人物：</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {event.characters.map(c => (
                    <span key={c} className="text-xs bg-amber-50 text-amber-800 px-2.5 py-1 rounded-full border border-amber-200/50">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 叙事文本 */}
            <div className="narrative-body text-stone-700 leading-relaxed text-[15px] space-y-2">
              {event.narrative.split('\n\n').map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}