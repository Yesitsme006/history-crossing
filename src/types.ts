export interface HistoricalEvent {
  id: string
  year: string
  title: string
  characters: string[]
  summary: string
  narrative: string
  dynasty: string
}

export interface Location {
  id: string
  name: string
  alias: string[]
  coordinates: [number, number]
  description: string
  era: string
  image: string
  events: HistoricalEvent[]
}

export interface NarrativeSegment {
  event: HistoricalEvent
  transition: string
}

export interface CrossNarrative {
  locationId: string
  title: string
  intro: string
  segments: NarrativeSegment[]
  closing: string
}