import { Select } from 'antd';
import type { Region, District } from '@/entities/location/model/types';

interface Props {
  regions: Region[];
  districts: District[];
  selectedRegionId: number | null;
  selectedDistrictId: number | null;
  onRegionChange: (id: number | null) => void;
  onDistrictChange: (id: number | null) => void;
}

export default function MapLocationFilter({
  regions,
  districts,
  selectedRegionId,
  selectedDistrictId,
  onRegionChange,
  onDistrictChange,
}: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <div className="text-xs text-gray-500 mb-1">Viloyat</div>
        <Select
          placeholder="Barchasi"
          allowClear
          className="w-full"
          value={selectedRegionId}
          options={regions.map((r) => ({ value: r.id, label: r.nameUz }))}
          onChange={(v) => onRegionChange(v ?? null)}
        />
      </div>

      <div>
        <div className="text-xs text-gray-500 mb-1">Tuman</div>
        <Select
          placeholder={selectedRegionId ? 'Barchasi' : 'Avval viloyat tanlang'}
          allowClear
          disabled={!selectedRegionId}
          className="w-full"
          value={selectedDistrictId}
          options={districts.map((d) => ({ value: d.id, label: d.nameUz }))}
          onChange={(v) => onDistrictChange(v ?? null)}
        />
      </div>
    </div>
  );
}
