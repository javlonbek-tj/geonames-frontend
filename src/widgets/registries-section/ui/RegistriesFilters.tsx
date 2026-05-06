import { Select, Input, Button } from 'antd';
import { ClearOutlined } from '@ant-design/icons';
import type { RegistryParams } from '@/entities/registry/api/registry.api';
import type { Region, District, Category, ObjectType } from '@/entities/location/model/types';

interface Props {
  filters: RegistryParams;
  searchInput: string;
  setSearchInput: (v: string) => void;
  setFilters: (updater: (prev: RegistryParams) => RegistryParams) => void;
  applySearch: () => void;
  clearFilters: () => void;
  hasFilters: boolean;
  regions: Region[];
  districts: District[];
  categories: Category[];
  typeOptions: ObjectType[];
}

export default function RegistriesFilters({
  filters,
  searchInput,
  setSearchInput,
  setFilters,
  applySearch,
  clearFilters,
  hasFilters,
  regions,
  districts,
  categories,
  typeOptions,
}: Props) {
  return (
    <div className="bg-white rounded-2xl border border-[#e3e8f0] p-4 mb-4">
      <div className="flex flex-wrap gap-3 items-end">
        <div style={{ width: 260 }}>
          <div className="text-xs text-gray-500 mb-1">Qidirish</div>
          <Input.Search
            placeholder="Nom yoki reyestr raqami..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onSearch={applySearch}
            onClear={() => {
              setSearchInput('');
              setFilters((f) => ({ ...f, page: 1, search: undefined }));
            }}
            allowClear
          />
        </div>

        <div style={{ minWidth: 160 }}>
          <div className="text-xs text-gray-500 mb-1">Viloyat</div>
          <Select
            placeholder="Barchasi"
            allowClear
            style={{ width: '100%' }}
            value={filters.regionId}
            options={regions.map((r) => ({ value: r.id, label: r.nameUz }))}
            onChange={(v) =>
              setFilters((f) => ({ ...f, page: 1, regionId: v, districtId: undefined }))
            }
          />
        </div>

        <div style={{ minWidth: 160 }}>
          <div className="text-xs text-gray-500 mb-1">Tuman</div>
          <Select
            placeholder="Barchasi"
            allowClear
            style={{ width: '100%' }}
            disabled={!filters.regionId}
            value={filters.districtId}
            options={districts.map((d) => ({ value: d.id, label: d.nameUz }))}
            onChange={(v) => setFilters((f) => ({ ...f, page: 1, districtId: v }))}
          />
        </div>

        <div style={{ minWidth: 180 }}>
          <div className="text-xs text-gray-500 mb-1">Guruh</div>
          <Select
            placeholder="Barchasi"
            allowClear
            style={{ width: '100%' }}
            value={filters.categoryId}
            options={categories.map((c) => ({
              value: c.id,
              label: c.code ? `[${c.code}] ${c.nameUz}` : c.nameUz,
            }))}
            onChange={(v) =>
              setFilters((f) => ({ ...f, page: 1, categoryId: v, objectTypeId: undefined }))
            }
          />
        </div>

        <div style={{ minWidth: 160 }}>
          <div className="text-xs text-gray-500 mb-1">Tur</div>
          <Select
            placeholder="Barchasi"
            allowClear
            style={{ width: '100%' }}
            disabled={!filters.categoryId}
            value={filters.objectTypeId}
            options={typeOptions.map((t) => ({ value: t.id, label: t.nameUz }))}
            onChange={(v) => setFilters((f) => ({ ...f, page: 1, objectTypeId: v }))}
          />
        </div>

        <div>
          <div className="text-xs mb-1 invisible">.</div>
          <Button icon={<ClearOutlined />} onClick={clearFilters} disabled={!hasFilters}>
            Tozalash
          </Button>
        </div>
      </div>
    </div>
  );
}
