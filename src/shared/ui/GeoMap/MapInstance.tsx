import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const TILES = {
  osm: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  satellite:
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
} as const;
type TileKey = keyof typeof TILES;

interface Props {
  geometry: object;
  height: number | string;
}

export default function MapInstance({ geometry, height }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const [tileKey, setTileKey] = useState<TileKey>('osm');

  useEffect(() => {
    if (!ref.current) return;
    const map = L.map(ref.current, {
      zoomControl: true,
      attributionControl: false,
    });
    tileLayerRef.current = L.tileLayer(TILES.osm).addTo(map);
    mapRef.current = map;
    try {
      const layer = L.geoJSON(geometry as Parameters<typeof L.geoJSON>[0], {
        pointToLayer: (_, latlng) =>
          L.circleMarker(latlng, {
            radius: 8,
            color: '#1565c0',
            fillColor: '#1565c0',
            fillOpacity: 0.8,
          }),
        style: {
          color: '#1565c0',
          weight: 2,
          fillOpacity: 0.15,
          fillColor: '#1565c0',
        },
      }).addTo(map);
      map.fitBounds(layer.getBounds(), { padding: [24, 24], maxZoom: 15 });
    } catch {
      /* geometry may be invalid */
    }
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
    const opts: L.TileLayerOptions =
      tileKey === 'satellite' ? { maxNativeZoom: 17 } : {};
    tileLayerRef.current = L.tileLayer(TILES[tileKey], opts).addTo(map);
    tileLayerRef.current.bringToBack();
  }, [tileKey]);

  return (
    <div
      className="relative w-full overflow-hidden rounded-sm"
      style={{ height }}
    >
      <div ref={ref} className="w-full h-full" />
      <div className="absolute bottom-3 right-3 z-1000 flex rounded-lg overflow-hidden shadow border border-gray-200 text-xs font-medium">
        <button
          onClick={() => setTileKey('osm')}
          className={`px-3 py-1.5 cursor-pointer transition-colors ${
            tileKey === 'osm'
              ? 'bg-[#1565c0] text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          Xarita
        </button>
        <button
          onClick={() => setTileKey('satellite')}
          className={`px-3 py-1.5 cursor-pointer transition-colors border-l border-gray-200 ${
            tileKey === 'satellite'
              ? 'bg-[#1565c0] text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          Satellite
        </button>
      </div>
    </div>
  );
}
