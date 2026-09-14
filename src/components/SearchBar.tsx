import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchLocations } from '../data'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const navigate = useNavigate()

  const results = searchLocations(query)
  const showDropdown = focused && query.trim().length > 0

  const handleSelect = useCallback((id: string) => {
    setQuery('')
    setFocused(false)
    navigate(`/place/${id}`)
  }, [navigate])

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          placeholder="搜索地点、人物、朝代…"
          className="w-full pl-12 pr-4 py-4 text-lg bg-white/90 backdrop-blur-sm rounded-2xl border border-stone-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition-all placeholder:text-stone-400"
        />
      </div>

      {showDropdown && (
        <div className="absolute z-50 mt-2 w-full bg-white rounded-2xl shadow-xl border border-stone-100 overflow-hidden max-h-80 overflow-y-auto">
          {results.length === 0 ? (
            <div className="px-5 py-8 text-center text-stone-400">
              <p className="text-lg">未找到相关地点</p>
              <p className="text-sm mt-1">试试搜索其他关键词</p>
            </div>
          ) : (
            results.map(loc => (
              <button
                key={loc.id}
                onClick={() => handleSelect(loc.id)}
                className="w-full px-5 py-4 text-left hover:bg-amber-50 transition-colors border-b border-stone-50 last:border-b-0 group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{loc.image}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-stone-800 group-hover:text-amber-700 transition-colors">{loc.name}</span>
                      <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">{loc.era}</span>
                    </div>
                    <p className="text-sm text-stone-500 truncate mt-0.5">{loc.description}</p>
                  </div>
                  <span className="text-stone-400 group-hover:text-amber-500 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}