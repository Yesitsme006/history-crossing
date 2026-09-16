import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { locations } from '../data'

/** 高德地图瓦片 URL */
const TILE_URL = 'https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'
const TILE_ATTR = '&copy; 高德地图'

export default function MapView() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      const map = L.map(mapRef.current, {
        center: [34, 108],
        zoom: 5,
        minZoom: 4,
        maxZoom: 10,
        zoomControl: true,
        attributionControl: false,
      })

      // 高德地图瓦片
      L.tileLayer(TILE_URL, {
        attribution: TILE_ATTR,
        maxZoom: 18,
      }).addTo(map)

      mapInstanceRef.current = map

      // 地图加载完成后刷新大小
      setTimeout(() => map.invalidateSize(), 100)
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  // 添加标记（map 实例变化时重新添加）
  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map) return

    // 清除旧标记
    map.eachLayer(layer => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer)
      }
    })

    const markers = L.featureGroup()

    locations.forEach(loc => {
      // 坐标转换：我们的数据是 [lng, lat]，Leaflet 需要 [lat, lng]
      const [lng, lat] = loc.coordinates

      // 自定义标记图标
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div class="marker-inner">
            <span class="marker-icon">${loc.image}</span>
            <span class="marker-label">${loc.name}</span>
          </div>
        `,
        iconSize: [120, 40],
        iconAnchor: [60, 20],
      })

      const marker = L.marker([lat, lng], { icon })
        .bindPopup(`
          <div class="marker-popup">
            <div class="popup-header">
              <span class="popup-icon">${loc.image}</span>
              <div>
                <h3>${loc.name}</h3>
                <span class="popup-era">${loc.era}</span>
              </div>
            </div>
            <p class="popup-desc">${loc.description}</p>
            <div class="popup-events">
              ${loc.events.map(e => `<span class="popup-event-tag">${e.title}</span>`).join('')}
            </div>
            <button class="popup-btn" data-id="${loc.id}">查看交汇故事 →</button>
          </div>
        `, {
          closeButton: true,
          className: 'custom-popup',
          maxWidth: 280,
        })

      marker.on('popupopen', () => {
        // 给弹窗里的按钮绑定点击事件
        const btn = document.querySelector(`.popup-btn[data-id="${loc.id}"]`)
        if (btn) {
          btn.addEventListener('click', () => {
            navigate(`/place/${loc.id}`)
          })
        }
      })

      markers.addLayer(marker)
    })

    markers.addTo(map)

    // 自动调整视图以包含所有标记
    if (locations.length > 0) {
      const markerBounds = markers.getBounds()
      if (markerBounds.isValid()) {
        map.fitBounds(markerBounds, { padding: [50, 50], maxZoom: 6 })
      }
    }
  }, [navigate])

  return (
    <div className="map-wrapper">
      <div ref={mapRef} className="map-container" />
    </div>
  )
}