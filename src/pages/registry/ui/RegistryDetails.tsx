import { useState } from 'react';
import { Descriptions, Typography } from 'antd';
import type { DescriptionsProps } from 'antd';

type DescriptionsItem = NonNullable<DescriptionsProps['items']>[number];
import type { GeoObject } from '@/entities/registry/model/types';

const COMMENT_LIMIT = 200;

function ExpandableComment({ value }: { value: string }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = value.length > COMMENT_LIMIT;
  const displayed =
    isLong && !expanded ? value.slice(0, COMMENT_LIMIT) + '...' : value;

  return (
    <span>
      {displayed}
      {isLong && (
        <Typography.Link
          onClick={() => setExpanded((v) => !v)}
          className="ml-1.5 text-xs"
        >
          {expanded ? "Kamroq ko'rsatish" : "Ko'proq ko'rsatish"}
        </Typography.Link>
      )}
    </span>
  );
}

export default function RegistryDetails({ obj }: { obj: GeoObject }) {
  const allItems: (DescriptionsItem & { show: boolean })[] = [
    {
      key: 'nameUz',
      label: 'Nomi (lotin)',
      children: obj.nameUz,
      show: !!obj.nameUz,
    },
    {
      key: 'nameKrill',
      label: 'Nomi (kirill)',
      children: obj.nameKrill,
      show: !!obj.nameKrill,
    },
    {
      key: 'registryNumber',
      label: 'Reyestr raqami',
      children: obj.registryNumber,
      show: !!obj.registryNumber,
    },
    { key: 'soato', label: 'SOATO', children: obj.soato, show: !!obj.soato },
    {
      key: 'category',
      label: 'Guruh',
      children: obj.objectType?.category?.nameUz,
      show: !!obj.objectType?.category?.nameUz,
    },
    {
      key: 'objectType',
      label: 'Obyekt turi',
      children: obj.objectType?.nameUz,
      show: !!obj.objectType?.nameUz,
    },
    {
      key: 'region',
      label: 'Viloyat',
      children: obj.region?.nameUz,
      show: !!obj.region?.nameUz,
    },
    {
      key: 'district',
      label: 'Tuman',
      children: obj.district?.nameUz,
      show: !!obj.district?.nameUz,
    },
    {
      key: 'affiliation',
      label: 'Tegishlilik',
      children: obj.affiliation,
      show: !!obj.affiliation,
    },
    {
      key: 'historicalName',
      label: 'Tarixiy nomi',
      children: obj.historicalName,
      show: !!obj.historicalName,
    },
    {
      key: 'basisDocument',
      label: "Me'yoriy hujjat",
      children: obj.basisDocument,
      show: !!obj.basisDocument,
    },
    {
      key: 'comment',
      label: 'Izoh',
      children: obj.comment ? <ExpandableComment value={obj.comment} /> : null,
      show: !!obj.comment,
    },
  ];

  const items = allItems.filter((i) => i.show);

  return (
    <div className="rounded-2xl border border-[#e2e8f4] bg-white p-4">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
        Ma'lumotlar
      </p>
      <Descriptions
        column={1}
        size="small"
        items={items}
        bordered
        styles={{
          label: {
            color: '#9ca3af',
            fontSize: 14,
            width: 144,
            alignItems: 'flex-start',
          },
          content: { color: '#0f1f3d', fontSize: 14, fontWeight: 500 },
        }}
      />
    </div>
  );
}
