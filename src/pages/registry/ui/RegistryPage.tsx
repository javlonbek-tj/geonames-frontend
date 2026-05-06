import { useState } from 'react';
import { Result, Spin } from 'antd';
import { useParams } from 'react-router';
import ExcerptModal from '@/features/registry-excerpt/ExcerptModal';
import { useRegistryItem } from '@/entities/registry/model/useRegistryItem';
import RegistryHeader from './RegistryHeader';
import RegistryDetails from './RegistryDetails';
import RegistryMap from './RegistryMap';

export default function RegistryPage() {
  const { id } = useParams<{ id: string }>();
  const { obj, isLoading } = useRegistryItem(Number(id));
  const [excerptOpen, setExcerptOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (!obj) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <Result status="404" title="Geografik obyekt topilmadi" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-4">
      <RegistryHeader obj={obj} onExcerpt={() => setExcerptOpen(true)} />

      <ExcerptModal obj={excerptOpen ? obj : null} onClose={() => setExcerptOpen(false)} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RegistryDetails obj={obj} />

        <div className="rounded-2xl border border-[#e2e8f4] bg-white p-4">
          {obj.geometry ? (
            <RegistryMap geometry={obj.geometry} title={obj.nameUz ?? 'Xaritada joylashuvi'} />
          ) : (
            <>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                Xaritada joylashuvi
              </p>
              <div className="flex items-center justify-center h-64 text-gray-300 text-sm">
                Geometriya mavjud emas
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
