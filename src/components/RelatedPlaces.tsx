import type { Location } from '../types'
import { useNavigate } from 'react-router-dom'
import { getRelatedLocations } from '../data'

interface Props {
  current: Location
}

export default function RelatedPlaces({ current }: Props) {
  const related = getRelatedLocations(current.id, 3)
  const navigate = useNavigate()

  return (
    <section>
      <h2 className="text-2xl font-semibold text-stone-800 heading-font mb-6">其他交汇之地</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {related.map(loc => (
          <button
            key={loc.id}
            onClick={() => navigate(`/place/${loc.id}`)}
            className="group bg-white rounded-xl p-4 shadow-sm hover:shadow-md border border-stone-100 text-left transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{loc.image}</span>
              <h3 className="font-medium text-stone-800 group-hover:text-amber-700 transition-colors heading-font">
                {loc.name}
              </h3>
            </div>
            <p className="text-sm text-stone-500 line-clamp-2 leading-relaxed">{loc.description}</p>
          </button>
        ))}
      </div>
    </section>
  )
}