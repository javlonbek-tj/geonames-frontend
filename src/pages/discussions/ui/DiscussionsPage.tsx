import { useDiscussionsFilter } from '@/features/discussions-filter/model/useDiscussionsFilter';
import { useDiscussionsQuery } from '@/entities/discussion/model/useDiscussionsQuery';
import DiscussionsFilters from './DiscussionsFilters';
import DiscussionsTable from './DiscussionsTable';

export default function DiscussionsPage() {
  const filter = useDiscussionsFilter();
  const { data, isFetching } = useDiscussionsQuery(filter.params);

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 py-10'>
      <div className='text-xs font-bold text-[#1565c0] tracking-widest uppercase mb-1.5'>
        Jamoatchilikka e'lon qilingan
      </div>
      <div className='h-1 w-10 bg-[#1565c0] rounded-full mb-4' />
      <h1 className='text-2xl font-extrabold text-[#0f1f3d] mb-6'>Ommaviy muhokamalar</h1>

      <DiscussionsFilters
        searchInput={filter.searchInput}
        regionId={filter.regionId}
        districtId={filter.districtId}
        regions={filter.regions}
        districts={filter.districts}
        hasFilters={filter.hasFilters}
        onSearchChange={filter.setSearchInput}
        onSearch={filter.applySearch}
        onSearchClear={filter.onSearchClear}
        onRegionChange={filter.onRegionChange}
        onDistrictChange={filter.onDistrictChange}
        onClear={filter.clearFilters}
      />

      <DiscussionsTable
        rows={data?.data ?? []}
        total={data?.meta.total ?? 0}
        isFetching={isFetching}
        page={filter.page}
        limit={filter.limit}
        onPageChange={filter.onPageChange}
      />
    </div>
  );
}
