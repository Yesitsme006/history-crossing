import { useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getLocationById } from '../data'
import NarrativeBlock from '../components/NarrativeBlock'
import Timeline from '../components/Timeline'
import EventCard from '../components/EventCard'
import RelatedPlaces from '../components/RelatedPlaces'

export default function PlacePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const location = getLocationById(id || '')
  const [activeEventId, setActiveEventId] = useState<string | undefined>()

  const handleEventSelect = useCallback((eventId: string) => {
    setActiveEventId(prev => prev === eventId ? undefined : eventId)
  }, [])

  if (!location) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="text-6xl block mb-4">🔍</span>
          <h2 className="text-2xl font-semibold text-stone-700 heading-font mb-2">未找到该地点</h2>
          <p className="text-stone-500 mb-6">这个地点还没有收录</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors"
          >
            返回首页
          </button>
        </div>
      </div>
    )
  }

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
          <span className="text-sm text-stone-400 heading-font">{location.name}</span>
        </div>
      </div>

      {/* 叙事正文 */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <NarrativeBlock location={location} />
      </section>

      {/* 分隔 */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="border-t border-stone-200 my-4" />
      </div>

      {/* 时间线 */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold text-stone-800 heading-font mb-8">
          ⏳ 时间线
          <span className="text-sm font-normal text-stone-400 ml-2">— 同一地点，不同时代</span>
        </h2>
        <Timeline
          events={location.events}
          activeEventId={activeEventId}
          onSelect={handleEventSelect}
        />
      </section>

      {/* 分隔 */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="border-t border-stone-200 my-4" />
      </div>

      {/* 事件详情 */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold text-stone-800 heading-font mb-2">
          📜 事件详情
        </h2>
        <p className="text-stone-500 text-sm mb-6">点击展开阅读完整故事</p>
        <div className="space-y-4">
          {location.events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* 相关地点 */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <RelatedPlaces current={location} />
      </section>
    </div>
  )
}