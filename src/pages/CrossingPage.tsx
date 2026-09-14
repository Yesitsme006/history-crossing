import { useNavigate } from 'react-router-dom'
import { locations } from '../data'

export default function CrossingPage() {
  const navigate = useNavigate()

  return (
    <div className="page-enter">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-40 bg-[#faf8f5]/90 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-800 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回
          </button>
          <span className="text-sm text-stone-400 heading-font">全部交汇故事</span>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-stone-900 heading-font mb-2">全部交汇故事</h1>
        <p className="text-stone-500 mb-10">每一个地点，都是不同时代故事的汇聚点。</p>

        <div className="space-y-6">
          {locations.map(loc => (
            <button
              key={loc.id}
              onClick={() => navigate(`/place/${loc.id}`)}
              className="group w-full bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg border border-stone-100 text-left transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="flex items-start gap-5">
                <span className="text-4xl mt-1">{loc.image}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-semibold text-stone-800 group-hover:text-amber-700 transition-colors heading-font">
                      {loc.name}
                    </h2>
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">{loc.era}</span>
                  </div>
                  <p className="text-sm text-stone-500 line-clamp-2 leading-relaxed mb-3">{loc.description}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      {loc.events.map(e => (
                        <span key={e.id} className="text-xs bg-stone-100 text-stone-600 px-2 py-1 rounded-full border-2 border-white">
                          {e.dynasty}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-stone-400">{loc.events.length} 个事件 · {loc.alias.length} 个别名</span>
                  </div>
                </div>
                <svg className="w-5 h-5 mt-2 text-stone-300 group-hover:text-amber-500 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  )
}