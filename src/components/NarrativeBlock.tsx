import { useMemo, useRef } from 'react'
import type { Location } from '../types'
import { buildCrossNarrative } from '../data'

interface Props {
  location: Location
}

function parseParagraphs(text: string) {
  return text.split('\n\n').filter(Boolean).map((block, i) => {
    // Check if this is a chapter marker (一、二、三, etc.)
    const chapterMatch = block.match(/^([一二三四五六七八九十]+)$/)
    if (chapterMatch) {
      return (
        <div key={i} className="text-center py-6">
          <span className="inline-block text-2xl font-bold text-amber-700 heading-font tracking-widest">
            {chapterMatch[1]}
          </span>
        </div>
      )
    }
    return (
      <p key={i} className="text-[16px] sm:text-[17px] leading-[2] text-stone-700 indent-8">
        {block}
      </p>
    )
  })
}

export default function NarrativeBlock({ location }: Props) {
  const narrative = useMemo(() => buildCrossNarrative(location), [location])
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="max-w-2xl mx-auto px-4">
      {/* 标题 */}
      <div className="mb-10 text-center">
        <span className="text-5xl block mb-4">{location.image}</span>
        <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 heading-font mb-2">{location.name}</h1>
        <p className="text-stone-500">{location.alias.slice(0, 3).join(' · ')}</p>
        <div className="mt-6 flex items-center justify-center gap-4 text-xs text-stone-400">
          <span>{location.events.length} 个时代的故事</span>
          <span className="w-1 h-1 rounded-full bg-stone-300" />
          <span>总阅读时长约 30-45 分钟</span>
        </div>
      </div>

      {/* 叙事文章 */}
      <article className="narrative-body">
        {/* 引言 */}
        <div className="mb-8">
          <p className="text-base sm:text-lg leading-[1.9] text-stone-500 italic border-l-4 border-amber-300 pl-5">
            {narrative.intro}
          </p>
        </div>

        {/* 分段故事 */}
        {narrative.segments.map((segment, i) => (
          <div key={segment.event.id} className="mb-12 last:mb-0">
            {/* 转场 - 上一条故事的钩子和下一条故事的承接 */}
            {i > 0 && (
              <div className="relative my-12 py-6">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-stone-200" />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 bg-[#faf8f5] text-2xl">⏳</span>
                </div>
              </div>
            )}

            {/* 事件标签header */}
            <div className="sticky top-14 z-30 bg-[#faf8f5]/95 backdrop-blur-sm py-3 mb-6 -mx-4 px-4 border-b border-amber-100">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-amber-700 whitespace-nowrap">{segment.event.year}</span>
                <span className="text-xs bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full whitespace-nowrap">{segment.event.dynasty}</span>
                <span className="text-sm font-semibold text-stone-700 heading-font leading-tight">{segment.event.title}</span>
              </div>
            </div>

            {/* 叙事正文 */}
            <div className="space-y-1">
              {parseParagraphs(segment.event.narrative)}
            </div>

            {/* 关键人物标签 */}
            {segment.event.characters.length > 0 && (
              <div className="mt-8 pt-4 border-t border-stone-100">
                <span className="text-xs text-stone-400 heading-font font-medium mr-2">登场人物：</span>
                <div className="inline-flex flex-wrap gap-2 mt-1">
                  {segment.event.characters.map(c => (
                    <span key={c} className="text-xs bg-stone-100 text-stone-600 px-3 py-1 rounded-full border border-stone-200">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* 结尾 - 引导探索其他地点 */}
        <div className="relative mt-16 pt-10 text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          <span className="text-3xl block mb-4">🌍</span>
          <p className="text-base leading-[1.9] text-stone-500 italic max-w-lg mx-auto">
            {location.name}的故事讲完了。但还有更多的交汇之地等待你去探索——每一个地点，都有属于它的时空对话。
          </p>
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-stone-400">
            <span className="w-6 h-px bg-stone-300" />
            <span>历史从不重复，但历史押韵</span>
            <span className="w-6 h-px bg-stone-300" />
          </div>
        </div>
      </article>
    </div>
  )
}