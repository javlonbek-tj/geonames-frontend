import { Button, Input, Select } from 'antd';
import { ClearOutlined } from '@ant-design/icons';
import type { Region, District } from '@/entities/location/model/types';

interface Props {
  searchInput: string;
  regionId: number | undefined;
  districtId: number | undefined;
  regions: Region[];
  districts: District[];
  hasFilters: boolean;
  onSearchChange: (v: string) => void;
  onSearch: () => void;
  onSearchClear: () => void;
  onRegionChange: (v: number | undefined) => void;
  onDistrictChange: (v: number | undefined) => void;
  onClear: () => void;
}

export default function DiscussionsFilters({
  searchInput,
  regionId,
  districtId,
  regions,
  districts,
  hasFilters,
  onSearchChange,
  onSearch,
  onSearchClear,
  onRegionChange,
  onDistrictChange,
  onClear,
}: Props) {
  return (
    <div className='bg-white rounded-2xl border border-[#e3e8f0] p-4 mb-4'>
      <div className='flex flex-wrap gap-3 items-end'>
        <div style={{ width: 260 }}>
          <div className='text-xs text-gray-500 mb-1'>Qidirish</div>
          <Input.Search
            placeholder="Nom bo'yicha qidirish..."
            value={searchInput}
            onChange={(e) => onSearchChange(e.target.value)}
            onSearch={onSearch}
            onClear={onSearchClear}
            allowClear
          />
        </div>

        <div style={{ minWidth: 160 }}>
          <div className='text-xs text-gray-500 mb-1'>Viloyat</div>
          <Select
            placeholder='Barchasi'
            allowClear
            style={{ width: '100%' }}
            value={regionId}
            options={regions.map((r) => ({ value: r.id, label: r.nameUz }))}
            onChange={onRegionChange}
          />
        </div>

        <div style={{ minWidth: 160 }}>
          <div className='text-xs text-gray-500 mb-1'>Tuman</div>
          <Select
            placeholder='Barchasi'
            allowClear
            style={{ width: '100%' }}
            disabled={!regionId}
            value={districtId}
            options={districts.map((d) => ({ value: d.id, label: d.nameUz }))}
            onChange={onDistrictChange}
          />
        </div>

        <div>
          <div className='text-xs mb-1 invisible'>.</div>
          <Button icon={<ClearOutlined />} onClick={onClear} disabled={!hasFilters}>
            Tozalash
          </Button>
        </div>
      </div>
    </div>
  );
}
