import Fuse from 'fuse.js'
import { locations } from './locations'
import type { Location, CrossNarrative, NarrativeSegment } from '../types'

// Fuse.js fuzzy search options
const fuseOptions = {
  keys: [
    { name: 'name', weight: 2 },
    { name: 'alias', weight: 1.5 },
    { name: 'events.title', weight: 1 },
    { name: 'events.characters', weight: 1.5 },
    { name: 'events.dynasty', weight: 1 },
    { name: 'description', weight: 0.5 },
  ],
  threshold: 0.4,
  includeScore: true,
}

const fuse = new Fuse(locations, fuseOptions)

export function searchLocations(query: string): Location[] {
  if (!query.trim()) return locations
  const results = fuse.search(query.trim())
  return results.map(r => r.item)
}

export function getLocationById(id: string): Location | undefined {
  return locations.find(l => l.id === id)
}

export function getRandomLocation(): Location {
  return locations[Math.floor(Math.random() * locations.length)]
}

export function getRelatedLocations(currentId: string, count: number = 3): Location[] {
  return locations
    .filter(l => l.id !== currentId)
    .sort(() => Math.random() - 0.5)
    .slice(0, count)
}

/** 生成一个地点的"交汇叙事"结构 */
export function buildCrossNarrative(location: Location): CrossNarrative {
  const sortedEvents = [...location.events].sort((a, b) => {
    const yearA = extractYear(a.year)
    const yearB = extractYear(b.year)
    return yearA - yearB
  })

  const segments: NarrativeSegment[] = sortedEvents.map((event, i) => {
    let transition = ''
    if (i === 0) {
      transition = `让我们回到${event.year}，${location.name}的故事从这里开始。`
    } else {
      transition = `但时间继续向前。${event.year}，就在同一个地方，一切又不一样了。`
    }
    return { event, transition }
  })

  const titles = sortedEvents.map(e => `"${e.title}"`).join(' vs ')
  const title = `${location.name}：${titles}`

  const timeSpan = sortedEvents.length >= 2
    ? `从${sortedEvents[0].year}到${sortedEvents[sortedEvents.length - 1].year}`
    : ''

  return {
    locationId: location.id,
    title,
    intro: `${location.description}`,
    segments,
    closing: `${location.name}，${timeSpan}，无数人在同一片土地上走过不同的人生。历史从来不是线性的——它是折叠的。在同一空间里，不同时代的故事层层叠叠地交织在一起。站在这里，你脚下踩着的，可能是周幽王的烽火台，也可能是唐玄宗的白玉石阶。`,
  }
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

export { locations }