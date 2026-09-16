import { useNavigate } from 'react-router-dom'
import type { Location } from '../types'

interface Props {
  location: Location
}

export default function LocationCard({ location }: Props) {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(`/place/${location.id}`)}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 text-left w-full transform hover:-translate-y-1"
    >
      {/* 渐变色header */}
      <div className="h-32 bg-gradient-to-br from-amber-100 via-amber-50 to-orange-100 flex items-center justify-center">
        <span className="text-5xl transition-transform duration-300 group-hover:scale-110">{location.image}</span>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold text-stone-800 group-hover:text-amber-700 transition-colors heading-font">
            {location.name}
          </h3>
          <span className="text-xs bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full">{location.era}</span>
        </div>
        <p className="text-sm text-stone-500 line-clamp-2 leading-relaxed">
          {location.description}
        </p>
        <div className="mt-4 flex items-center gap-2 text-xs text-stone-400">
          <span>{location.events.length} 个历史事件</span>
          <span className="text-stone-300">·</span>
          <span>{location.alias.length} 个别名</span>
        </div>
      </div>

      {/* Hover indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    </button>
  )
}