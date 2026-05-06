import { useEffect, useRef, useState } from 'react';
import { CloseOutlined, ExpandOutlined } from '@ant-design/icons';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function MapInstance({ geometry, height }: { geometry: object; height: number | string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const map = L.map(ref.current, { zoomControl: true, attributionControl: false });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    try {
      const layer = L.geoJSON(geometry as Parameters<typeof L.geoJSON>[0], {
        style: { color: '#1565c0', weight: 2, fillOpacity: 0.15, fillColor: '#1565c0' },
        pointToLayer: (_, latlng) =>
          L.circleMarker(latlng, { radius: 8, color: '#1565c0', fillOpacity: 0.8 }),
      }).addTo(map);
      map.fitBounds(layer.getBounds(), { padding: [24, 24] });
    } catch {
      /* geometry may be invalid */
      map.setView([41.3, 64.6], 6);
    }
    return () => { map.remove(); };
  }, [geometry]);

  return <div ref={ref} className='w-full rounded-2xl' style={{ height }} />;
}

interface Props {
  geometry: object;
  title: string;
}

export default function GeoMap({ geometry, title }: Props) {
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <>
      <div className='flex items-center justify-between mb-4'>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f1f3d', margin: 0 }}>
          Geografik joylashuv
        </h3>
        <button
          onClick={() => setFullscreen(true)}
          className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer border border-[#d1d9e8] bg-white hover:bg-gray-50 transition-colors'
          style={{ color: '#1565c0' }}
        >
          <ExpandOutlined style={{ fontSize: 12 }} />
          To'liq ekran
        </button>
      </div>

      {!fullscreen && <MapInstance geometry={geometry} height={260} />}

      {fullscreen && (
        <div className='fixed inset-0 z-[9999] flex flex-col' style={{ background: '#000' }}>
          <div
            className='flex items-center justify-between px-4 py-3 shrink-0'
            style={{ background: '#0f1f3d' }}
          >
            <span className='text-white font-semibold text-sm'>{title}</span>
            <button
              onClick={() => setFullscreen(false)}
              className='w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer border-0 transition-colors'
              style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}
            >
              <CloseOutlined style={{ fontSize: 14 }} />
            </button>
          </div>
          <div className='flex-1'>
            <MapInstance geometry={geometry} height='100%' />
          </div>
        </div>
      )}
    </>
  );
}
