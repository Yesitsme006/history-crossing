import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import LocationCard from '../components/LocationCard'
import RandomDiscovery from '../components/RandomDiscovery'
import MapView from '../components/MapView'
import { locations } from '../data'

type ViewMode = 'cards' | 'map'

export default function HomePage() {
  const navigate = useNavigate()
  const [viewMode, setViewMode] = useState<ViewMode>('cards')

  return (
    <div className="page-enter">
      {/* Hero */}
      <header className="relative pt-16 pb-8 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-50/80 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-amber-200/20 via-orange-100/10 to-transparent rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="mb-4">
            <span className="text-5xl block mb-3">⏳</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 heading-font mb-3">
              历史交汇点
            </h1>
            <p className="text-base sm:text-lg text-stone-500 leading-relaxed max-w-xl mx-auto">
              同一地点，不同时空的故事在这里交织。<br />
              让碎片时间，变成一段跨越千年的旅程。
            </p>
          </div>

          <div className="mt-6 mb-4">
            <SearchBar />
          </div>

          <RandomDiscovery />
        </div>
      </header>

      {/* 视图切换 */}
      <div className="max-w-6xl mx-auto px-4 mb-6">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <h2 className="text-xl font-semibold text-stone-800 heading-font">
            {viewMode === 'cards' ? '探索交汇之地' : '在地图上探索'}
          </h2>
          <div className="flex bg-stone-100 rounded-lg p-0.5">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-4 py-1.5 text-sm rounded-md transition-all ${
                viewMode === 'cards'
                  ? 'bg-white text-amber-700 shadow-sm font-medium'
                  : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                卡片
              </span>
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-4 py-1.5 text-sm rounded-md transition-all ${
                viewMode === 'map'
                  ? 'bg-white text-amber-700 shadow-sm font-medium'
                  : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                地图
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 内容 */}
      <main className="max-w-6xl mx-auto px-4 pb-16">
        {viewMode === 'cards' ? (
          <>
            <div className="flex items-center justify-end mb-4">
              <button
                onClick={() => navigate('/crossing')}
                className="text-sm text-amber-600 hover:text-amber-700 transition-colors flex items-center gap-1"
              >
                浏览全部
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {locations.map(loc => (
                <LocationCard key={loc.id} location={loc} />
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-xl overflow-hidden border border-stone-200 shadow-sm">
            <MapView />
          </div>
        )}
      </main>
    </div>
  )
}