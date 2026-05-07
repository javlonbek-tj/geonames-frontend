import { useState } from 'react';
import { CloseOutlined, ExpandOutlined } from '@ant-design/icons';
import MapInstance from './MapInstance';

interface Props {
  geometry: object;
  title: string;
  height?: number | string;
}

export default function GeoMap({ geometry, title, height = 300 }: Props) {
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest m-0">
          {title}
        </p>
        <button
          onClick={() => setFullscreen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer border border-[#d1d9e8] bg-white hover:bg-gray-50 transition-colors text-[#1565c0]"
        >
          <ExpandOutlined style={{ fontSize: 11 }} />
          To&apos;liq ekran
        </button>
      </div>

      {!fullscreen && <MapInstance geometry={geometry} height={height} />}

      {fullscreen && (
        <div className="fixed inset-0 z-9999 flex flex-col bg-black">
          <div className="flex items-center justify-between px-4 py-3 shrink-0 bg-[#0f1f3d]">
            <span className="text-white font-semibold text-sm">{title}</span>
            <button
              onClick={() => setFullscreen(false)}
              className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer border-0 bg-white/15 text-white transition-colors hover:bg-white/25"
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
