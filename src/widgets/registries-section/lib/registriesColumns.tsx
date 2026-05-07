import type { ColumnsType } from 'antd/es/table';
import { EyeOutlined } from '@ant-design/icons';
import { Link } from 'react-router';
import type { GeoObject } from '@/entities/registry/model/types';
import CopyableNumber from '../ui/CopyableNumber';

export function getRegistriesColumns(page: number, limit: number): ColumnsType<GeoObject> {
  return [
    {
      title: '№',
      width: 44,
      render: (_, __, idx) => (page - 1) * limit + idx + 1,
    },
    {
      title: 'Nomi',
      width: 180,
      render: (_, obj) => (
        <>
          <div className='font-medium text-gray-900 text-sm leading-tight'>{obj.nameUz ?? '—'}</div>
          {obj.nameKrill && <div className='text-xs text-gray-400 mt-0.5'>{obj.nameKrill}</div>}
        </>
      ),
    },
    {
      title: 'Guruh',
      width: 170,
      render: (_, obj) => obj.objectType?.category?.nameUz ?? '—',
    },
    {
      title: 'Tur',
      width: 150,
      render: (_, obj) => obj.objectType?.nameUz ?? '—',
    },
    {
      title: 'Hudud',
      width: 160,
      render: (_, obj) => (
        <>
          <div className='text-sm text-gray-700'>{obj.region?.nameUz ?? '—'}</div>
          {obj.district?.nameUz && <div className='text-xs text-gray-400'>{obj.district.nameUz}</div>}
        </>
      ),
    },
    {
      title: 'Reyestr raqami',
      width: 150,
      render: (_, obj) =>
        obj.registryNumber
          ? <CopyableNumber value={obj.registryNumber} />
          : <span className='text-gray-400 text-xs'>—</span>,
    },
    {
      title: '',
      key: 'detail',
      width: 44,
      render: (_, obj) => (
        <Link
          to={`/registry/${obj.id}`}
          className="flex items-center justify-center w-7 h-7 rounded-lg hover:bg-[#e8efff] transition-colors"
        >
          <EyeOutlined style={{ fontSize: 15, color: '#1565c0' }} />
        </Link>
      ),
    },
  ];
}
