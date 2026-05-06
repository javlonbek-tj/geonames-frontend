import { useEffect, useRef, useState } from 'react';
import { CloseOutlined, ExpandOutlined } from '@ant-design/icons';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const TILES = {
  osm: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  satellite:
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
} as const;
type TileKey = keyof typeof TILES;

function MapInstance({ geometry, height }: { geometry: object; height: number | string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const [tileKey, setTileKey] = useState<TileKey>('osm');

  useEffect(() => {
    if (!ref.current) return;
    const map = L.map(ref.current, { zoomControl: true, attributionControl: false });
    tileLayerRef.current = L.tileLayer(TILES.osm).addTo(map);
    mapRef.current = map;
    try {
      const layer = L.geoJSON(geometry as Parameters<typeof L.geoJSON>[0], {
        pointToLayer: (_, latlng) =>
          L.circleMarker(latlng, { radius: 8, color: '#1565c0', fillColor: '#1565c0', fillOpacity: 0.8 }),
        style: { color: '#1565c0', weight: 2 },
      }).addTo(map);
      map.fitBounds(layer.getBounds(), { padding: [32, 32], maxZoom: 15 });
    } catch { /* geometry may be invalid */ }
    return () => {
      map.remove();
      mapRef.current = null;
      tileLayerRef.current = null;
    };
  }, [geometry]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (tileLayerRef.current) map.removeLayer(tileLayerRef.current);
    const opts: L.TileLayerOptions = tileKey === 'satellite' ? { maxNativeZoom: 17 } : {};
    tileLayerRef.current = L.tileLayer(TILES[tileKey], opts).addTo(map);
    tileLayerRef.current.bringToBack();
  }, [tileKey]);

  return (
    <div className="relative w-full overflow-hidden" style={{ height, borderRadius: 8 }}>
      <div ref={ref} className="w-full h-full" />
      <div className="absolute bottom-3 right-3 z-1000 flex rounded-lg overflow-hidden shadow border border-gray-200 text-xs font-medium">
        <button
          onClick={() => setTileKey('osm')}
          className={`px-3 py-1.5 cursor-pointer transition-colors ${
            tileKey === 'osm' ? 'bg-[#1565c0] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          Xarita
        </button>
        <button
          onClick={() => setTileKey('satellite')}
          className={`px-3 py-1.5 cursor-pointer transition-colors border-l border-gray-200 ${
            tileKey === 'satellite' ? 'bg-[#1565c0] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          Satellite
        </button>
      </div>
    </div>
  );
}

interface Props {
  geometry: object;
  title: string;
}

export default function RegistryMap({ geometry, title }: Props) {
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest m-0">
          Xaritada joylashuvi
        </p>
        <button
          onClick={() => setFullscreen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer border border-[#d1d9e8] bg-white hover:bg-gray-50 transition-colors"
          style={{ color: '#1565c0' }}
        >
          <ExpandOutlined style={{ fontSize: 11 }} />
          To'liq ekran
        </button>
      </div>

      {!fullscreen && <MapInstance geometry={geometry} height={340} />}

      {fullscreen && (
        <div className="fixed inset-0 z-9999 flex flex-col" style={{ background: '#000' }}>
          <div
            className="flex items-center justify-between px-4 py-3 shrink-0"
            style={{ background: '#0f1f3d' }}
          >
            <span className="text-white font-semibold text-sm">{title}</span>
            <button
              onClick={() => setFullscreen(false)}
              className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer border-0 transition-colors"
              style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}
            >
              <CloseOutlined style={{ fontSize: 14 }} />
            </button>
          </div>
          <div className="flex-1">
            <MapInstance geometry={geometry} height="100%" />
          </div>
        </div>
      )}
    </>
  );
}
