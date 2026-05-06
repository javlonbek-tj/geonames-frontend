import { ArrowLeftOutlined, FileTextOutlined } from '@ant-design/icons';
import { Link } from 'react-router';
import type { GeoObject } from '@/entities/registry/model/types';

interface Props {
  obj: GeoObject;
  onExcerpt: () => void;
}

export default function RegistryHeader({ obj, onExcerpt }: Props) {
  return (
    <div className="flex items-center gap-3">
      <Link
        to="/registry"
        className="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
      >
        <ArrowLeftOutlined style={{ fontSize: 13, color: '#374151' }} />
      </Link>
      {obj.nameUz && (
        <h1 className="text-xl font-extrabold text-[#0f1f3d] m-0 flex-1">
          {obj.nameUz}
        </h1>
      )}
      {obj.objectType?.nameUz && (
        <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#e8efff] text-[#1565c0]">
          {obj.objectType.nameUz}
        </span>
      )}
      <button
        onClick={onExcerpt}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border border-[#d1d9e8] bg-white hover:bg-[#f0f4ff] transition-colors"
        style={{ color: '#1565c0' }}
      >
        <FileTextOutlined style={{ fontSize: 13 }} />
        Ko&apos;chirma
      </button>
    </div>
  );
}
