import { Select } from 'antd';
import type { Category } from '@/entities/location/model/types';

const BOUNDARY_TYPE_NAMES = new Set(['Viloyat', 'Tuman']);

interface Props {
  categories: Category[];
  selectedDistrictId: number | null;
  selectedCategoryId: number | null;
  selectedTypeIds: number[];
  onCategoryChange: (id: number | null) => void;
  onTypeIdsChange: (ids: number[]) => void;
}

export default function MapTypeFilter({
  categories,
  selectedDistrictId,
  selectedCategoryId,
  selectedTypeIds,
  onCategoryChange,
  onTypeIdsChange,
}: Props) {
  const availableTypes = selectedCategoryId
    ? (categories.find((c) => c.id === selectedCategoryId)?.objectTypes ?? [])
    : categories.flatMap((c) => c.objectTypes);

  const typeOptions = availableTypes.map((t) => ({
    value: t.id,
    label: t.nameUz,
    disabled: BOUNDARY_TYPE_NAMES.has(t.nameUz),
  }));

  const hasDistrict = selectedDistrictId !== null;

  return (
    <div className="border-t border-gray-100 pt-4 flex flex-col gap-3">
      <h3 className="text-xs font-bold text-[#0f1f3d] uppercase tracking-wider">
        Obyekt turlari
      </h3>

      <div>
        <div className="text-xs text-gray-500 mb-1">Guruh</div>
        <Select
          placeholder={hasDistrict ? 'Barchasi' : 'Avval tuman tanlang'}
          allowClear
          disabled={!hasDistrict}
          className="w-full"
          value={selectedCategoryId}
          options={categories.map((c) => ({ value: c.id, label: c.nameUz }))}
          onChange={(v) => {
            onCategoryChange(v ?? null);
            onTypeIdsChange([]);
          }}
        />
      </div>

      <div>
        <div className="text-xs text-gray-500 mb-1">Turlar</div>
        <Select
          mode="multiple"
          placeholder={hasDistrict ? 'Turlarni tanlang' : 'Avval tuman tanlang'}
          allowClear
          disabled={!hasDistrict}
          className="w-full"
          maxTagCount="responsive"
          value={selectedTypeIds}
          options={typeOptions}
          onChange={onTypeIdsChange}
        />
      </div>
    </div>
  );
}
